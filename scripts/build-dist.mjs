#!/usr/bin/env node
/**
 * Flatten theme index.css @import graphs into dist/<theme>.css
 * Usage: node scripts/build-dist.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const themes = ['cyber-nexus', 'ai-operator', 'aurora-glass'];

const importRe = /@import\s+url\(['"]([^'"]+)['"]\);?/g;

function resolveImport(fromFile, importPath) {
  return path.normalize(path.resolve(path.dirname(fromFile), importPath));
}

function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function flatten(entryFile, seen = new Set()) {
  const abs = path.normalize(entryFile);
  if (seen.has(abs)) {
    throw new Error(`Circular @import: ${abs}`);
  }
  seen.add(abs);

  if (!fs.existsSync(abs)) {
    throw new Error(`Missing file: ${abs}`);
  }

  // Strip comments so doc examples with remote @import urls are ignored.
  let source = stripComments(fs.readFileSync(abs, 'utf8'));
  const parts = [];
  let lastIndex = 0;
  let match;

  const re = new RegExp(importRe.source, 'g');
  while ((match = re.exec(source)) !== null) {
    const href = match[1];
    if (/^https?:\/\//i.test(href)) {
      throw new Error(`Remote @import not allowed in source: ${href} (${abs})`);
    }
    const before = source.slice(lastIndex, match.index).trim();
    if (before) parts.push(before);
    const child = resolveImport(abs, href);
    parts.push(flatten(child, new Set(seen)));
    lastIndex = match.index + match[0].length;
  }

  const after = source.slice(lastIndex).trim();
  if (after) parts.push(after);
  return parts.filter(Boolean).join('\n\n');
}

const distDir = path.join(root, 'dist');
fs.mkdirSync(distDir, { recursive: true });

const banner = (name) =>
  `/* Clash Verge Neo — ${name} (built single-file; do not edit)\n` +
  ` * Source: themes/${name}/  |  Spec: 08-cyber-aviation-hud (Cyber) / 07\n` +
  ` * Build: node scripts/build-dist.mjs\n */\n\n`;

for (const name of themes) {
  const entry = path.join(root, 'themes', name, 'index.css');
  const css = banner(name) + flatten(entry) + '\n';
  // Guard against CSS comment early-close (e.g. "themes/*/foo" → "*/")
  // which leaves orphan text and can break stylesheet parse.
  if (/^[^{]*colors\.css\)/m.test(css) || /\n[a-zA-Z0-9_.-]+\.css\)/.test(css)) {
    throw new Error(
      `dist/${name}.css looks corrupted by an early "*/" in a comment. ` +
        `Search source comments for "*/" sequences (often from "themes/*/...").`,
    );
  }
  const out = path.join(distDir, `${name}.css`);
  fs.writeFileSync(out, css, 'utf8');
  const kb = (Buffer.byteLength(css) / 1024).toFixed(1);
  console.log(`wrote dist/${name}.css (${kb} KiB)`);
}
