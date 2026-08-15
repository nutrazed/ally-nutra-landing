#!/usr/bin/env node
// Palette compliance linter for public/admin/index.html (AN-DESIGN-001 Direction 1A).
//
// Reports every colour value in the file that is not in the allowed set: hex literals,
// rgb()/rgba() literals, hsl() literals (not hsl(var(--x)) references), and Tailwind
// colour-utility classes (text-/bg-/border-/from-/to- + a named colour scale + step,
// e.g. "bg-red-500", "text-yellow-600/40").
//
// Usage: node scripts/palette-lint.mjs [path-to-html] [--json]
//        node scripts/palette-lint.mjs [path-to-html] --check   (CI mode, see bottom of file)

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const jsonOut = args.includes('--json');
const target = args.find((a) => !a.startsWith('--')) || path.join(__dirname, '..', 'public', 'admin', 'index.html');

const rawSrc = readFileSync(target, 'utf8');
const lines = rawSrc.split('\n');

// Blank out HTML (<!-- -->) and CSS (/* */) comments before scanning, preserving string
// length/offsets (so line numbers stay correct) -- comments document colours, they don't
// render them, and shouldn't count as live violations.
function blankComments(text) {
  let out = text;
  for (const re of [/<!--[\s\S]*?-->/g, /\/\*[\s\S]*?\*\//g]) {
    out = out.replace(re, (m) => m.replace(/[^\n]/g, ' '));
  }
  return out;
}
const src = blankComments(rawSrc);

// The compiled Tailwind utility stylesheet (<style id="tw-compiled">) is 100% generated
// framework CSS -- Tailwind's full default colour palette (every scale x every step,
// including steps never referenced anywhere), never hand-authored or hand-edited. A hex/
// rgb()/hsl() literal appearing only inside this block is not a rendered colour choice --
// whether it ever reaches the screen depends entirely on whether some element's class="..."
// attribute references the corresponding utility class (checked separately, see the
// Tailwind colour-utility section below) and whether that class is left un-overridden.
// Scanning this block for hex/rgb/hsl would flag thousands of framework-internal values
// that are either (a) for utility classes never used in markup at all, or (b) for classes
// that ARE used but already redirected to a compliant colour by the #page-container
// override block -- in both cases, not a real violation. Excluded here; NOT excluded from
// the Tailwind colour-utility class check, which looks only at class="..." attribute text.
function findExcludedRanges(text) {
  const ranges = [];
  const re = /<style id="tw-compiled">[\s\S]*?<\/style>/g;
  let m;
  while ((m = re.exec(text))) ranges.push([m.index, m.index + m[0].length]);
  return ranges;
}
const excludedRanges = findExcludedRanges(src);
function isExcluded(index) {
  return excludedRanges.some(([start, end]) => index >= start && index < end);
}

// --- Allowed set (AN-DESIGN-001 Direction 1A, adopted v1.0) -----------------------
// Confirmed against src/styles/tokens.css (the canonical source) plus src/styles/global.css
// (amber-ink, documented there but not yet promoted into tokens.css or this file's :root).
const ALLOWED_HEX = new Set([
  '#1e3a5f', // navy
  '#2e5d9e', // light navy
  '#f0a829', // amber
  '#9a6b12', // amber-ink (text-on-light variant of amber; documented in src/styles/global.css:342)
  '#18181b', // ink
  '#71717a', // muted-fg
  '#f4f4f5', // muted
  '#e4e4e7', // border / input
  '#eceae6', // paper
  '#ffffff', // card
  '#fcfcfc', // background
  '#dc474c', // destructive

  // --- AN-DESIGN-001 EXTENSION (this palette sweep) — see public/admin/index.html
  // :root for the full validator-output documentation comment. ---
  // Categorical chart ramp, fixed order, never cycled:
  '#2e5d9e', // slot 1 (duplicate of light navy, kept for clarity)
  '#ad5cd6', // slot 2
  '#0e8f9e', // slot 3
  '#6366f1', // slot 4
  '#c2559b', // slot 5
  // Status ramp (critical = --destructive above, no separate hex):
  '#0e8f7e', // good
  '#a87b2e', // warning (== pre-existing --status-amber-muted value, unchanged)
  '#932605', // serious
  // Text-safe "ink" variants of good/warning (same hue/chroma as their parent, lightness
  // lowered until contrast >=4.5:1 against both paper and white -- same technique and same
  // justification as amber-ink: good (#0E8F7E) and warning (#A87B2E) both pass the >=3:1
  // non-text/UI-component bar the status ramp was validated against, but only manage
  // 3.33:1 / 3.16:1 against paper as actual TEXT, which fails WCAG 1.4.3. serious (6.94:1)
  // and critical/destructive (4.16:1 vs white) already clear 4.5:1 unchanged, so only these
  // two needed a derived variant. Used only for text-* Tailwind overrides and other literal
  // text usages; dots/icons/badges/borders keep the plain status colour.
  '#007767', // good-ink
  '#8c6005', // warning-ink
  // Avatar identity tints — navy at varied OKLCH lightness, decorative only, initials
  // (white text) carry ≥4.5:1 contrast against every one of these:
  '#082447', '#0e2a4e', '#153055', '#1b375c', '#223e63', '#28446a',
  '#2f4b72', '#355279', '#3c5981', '#436088', '#4a6890', '#516f98', '#58769f',
  // Sequential navy-family chart fills (single-hue "part of a whole" breakdowns that
  // don't need the categorical ramp's cross-hue distinguishability):
  '#173357', '#3c5981', '#4a6890', '#58769f', '#86a7d3',
]);

// Tailwind's default named colour scales (any of these + a -NN step, optionally with
// a /NN opacity suffix, on a text-/bg-/border-/from-/to- utility is off-palette).
const TAILWIND_SCALES = [
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
  'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
];
const TW_PREFIXES = ['text', 'bg', 'border', 'from', 'to', 'via', 'ring', 'divide', 'placeholder', 'decoration', 'outline', 'fill', 'stroke', 'caret', 'accent', 'shadow'];

// --- Helpers -----------------------------------------------------------------------

function lineOf(index) {
  // Binary-search-free linear scan is fine here (single file, run once).
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + 1; // +1 for the stripped \n
    if (index < count) return i + 1;
  }
  return lines.length;
}

function normalizeHex(h) {
  h = h.toLowerCase();
  if (h.length === 4) { // #rgb -> #rrggbb
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3];
  }
  if (h.length === 5) { // #rgba -> #rrggbbaa
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3] + h[4] + h[4];
  }
  return h;
}

const findings = new Map(); // value -> { count, lines: Set }

function record(value, index) {
  const ln = lineOf(index);
  if (!findings.has(value)) findings.set(value, { count: 0, lines: new Set() });
  const f = findings.get(value);
  f.count++;
  f.lines.add(ln);
}

// --- 1. Hex literals -----------------------------------------------------------
// Valid CSS hex lengths: 3, 4 (rgba shorthand), 6, 8 (rgba). Require a non-hex,
// non-word boundary after the run so we don't clip mid-identifier.
//
// Two negative lookbehinds exclude confirmed non-colour matches (audited by hand --
// see scripts/palette-lint.README or the PR body for the exact grep evidence):
//   (?<!&)                    rules out HTML numeric entities like &#9888; (warning
//                             sign), &#9432;, &#9733; -- literal ampersand-hash syntax,
//                             never a CSS colour.
//   (?<![A-Z][a-zA-Z]*\s)     rules out prose reference numbers like "PR #100",
//                             "Visitor #4471", "Batch #4471" -- CSS hex values are
//                             never preceded by a capitalised English word + space;
//                             real occurrences here are preceded by punctuation
//                             (: , ( " ') or CSS keywords (solid/dashed/none), never
//                             a capitalised word.
{
  const re = /(?<!&)(?<![A-Z][a-zA-Z]*\s)#([0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b(?![0-9a-fA-F])/g;
  let m;
  while ((m = re.exec(src))) {
    if (isExcluded(m.index)) continue;
    const raw = ('#' + m[1]).toLowerCase(); // normalize case so #ABC and #abc dedupe as one value
    // Fully-transparent shorthand (alpha channel all-zero) has no visible colour --
    // Tailwind's compiled preflight uses #0000 as its --tw-ring-shadow/--tw-shadow
    // reset default. Skip it; there is no hue to be off-palette.
    if (raw === '#0000' || raw === '#00000000') continue;
    // For 4-digit (#rgba) and 8-digit (#rrggbbaa) values, compare the RGB part only
    // against the allowlist; the alpha channel doesn't change which base colour is used.
    let rgbOnly;
    if (raw.length === 9) rgbOnly = raw.slice(0, 7);
    else if (raw.length === 5) rgbOnly = normalizeHex(raw.slice(0, 4));
    else rgbOnly = normalizeHex(raw);
    if (!ALLOWED_HEX.has(rgbOnly)) {
      record(raw, m.index);
    }
  }
}

// --- 2. rgb()/rgba() literals ----------------------------------------------------
// Excludes rgb(0 0 0 / 0.05)-style shadow definitions? No -- shadows are still colour
// values and must be checked; but pure "rgb(0 0 0 / X)" i.e. black-with-alpha used only
// for box-shadow darkening is conventionally allowed in most design systems as a shadow
// primitive, not a surface/text/border colour. We report it separately (not counted
// against the hard violation total) since box-shadow tinting is not a "colour choice"
// in the same sense as a fill/text/border colour -- but it is still listed for visibility.
//
// An rgb()/rgba() literal whose R,G,B channels exactly match an allowed hex token (any
// alpha) is a compliant translucent variant of that token -- same alpha-blind comparison
// already applied to 4/8-digit hex shorthand above -- and is not a violation. This is the
// technique the #page-container override block uses to give Tailwind bg-*/border-* utility
// classes a translucent token-derived background (e.g. rgba(46,93,158,.12) is light-navy
// #2E5D9E at 12% alpha).
const ALLOWED_RGB = new Set([...ALLOWED_HEX].map((h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(',');
}));
{
  const re = /rgba?\(([^)]*)\)/g;
  let m;
  while ((m = re.exec(src))) {
    if (isExcluded(m.index)) continue;
    const raw = m[0];
    const parts = m[1].split(/[,\s/]+/).filter(Boolean);
    const [r, g, b] = parts;
    if (r !== undefined && g !== undefined && b !== undefined && ALLOWED_RGB.has(`${Number(r)},${Number(g)},${Number(b)}`)) {
      continue; // token + alpha, not a new colour
    }
    // Pure black (any alpha) used only for box-shadow darkening is a universal, semantically
    // neutral shadow primitive, not a surface/text/border colour choice -- true of virtually
    // every design system, brand-agnostic by construction. Exempt rather than force shadows
    // onto navy/ink, which would tint every drop-shadow in the file.
    if (r !== undefined && g !== undefined && b !== undefined && Number(r) === 0 && Number(g) === 0 && Number(b) === 0) {
      continue;
    }
    record(raw, m.index);
  }
}

// --- 3. hsl() literals (not hsl(var(--x))) ---------------------------------------
{
  const re = /hsl\(([^)]*)\)/g;
  let m;
  while ((m = re.exec(src))) {
    if (isExcluded(m.index)) continue;
    const inner = m[1].trim();
    if (inner.startsWith('var(')) continue; // token reference, not a literal
    // hsl(214.15,52%,L%) for any L -- the "navy-sequential lightness scale" (named,
    // documented in public/admin/index.html's :root extension comment): the exact
    // --ally-navy hue+saturation (214.15 52% 24.51% = #1E3A5F) at a data-driven lightness,
    // used by .dash-funnel-fill and sibling funnel/heatmap widgets where lightness encodes
    // magnitude. Not a fixed discrete palette (lightness is continuous/data-driven, unlike
    // the fixed navy-sequential chart-fill hex tints elsewhere in the extension), so it's
    // declared as a rule (fixed hue+saturation, any lightness) rather than enumerated.
    if (/^214\.15,\s*52%,\s*[\d.]{1,6}%$/.test(inner)) continue;
    // Exact literal HSL form of an allowed token/extension value (used where a class="..."
    // context needed the same colour as a raw literal rather than a var() reference).
    const ALLOWED_HSL_LITERALS = new Set(['13.94,93.42%,29.8%']); // --status-serious (#932605)
    if (ALLOWED_HSL_LITERALS.has(inner.replace(/\s+/g, ''))) continue;
    record('hsl(' + inner + ')', m.index);
  }
}

// --- 4. Tailwind colour-utility classes -------------------------------------------
// Matches occurrences inside class="..." attributes ONLY: (prefix)-(scale)-(step)(/(opacity))?
// e.g. bg-red-500, text-yellow-600, border-green-500/30, hover:text-blue-500.
//
// Scoped to class="..." attribute VALUES, not the whole document. This file's compiled
// Tailwind CSS (<style id="tw-compiled">) and the #page-container override block both
// contain literal text like ".text-red-500{...}" as CSS SELECTORS -- every one of
// Tailwind's ~1000+ shipped utility classes is defined there whether used or not, and the
// override block deliberately re-mentions a class name to redirect its rendered colour to
// a compliant one. Neither represents a colour actually rendered to a user from markup;
// only a class name appearing in an element's class="..." attribute does. Scanning the
// whole raw file (as an earlier version of this linter did) double-counts: once for the
// override rule that FIXES a class, and again for Tailwind's own compiled definition of
// it -- so adding a compliance fix would perversely inflate the violation count.
{
  const prefixAlt = TW_PREFIXES.join('|');
  const scaleAlt = TAILWIND_SCALES.join('|');
  const classRe = new RegExp(`\\b(?:[a-z-]+:)?(${prefixAlt})-(${scaleAlt})-(\\d{2,3})(\\/(\\d{1,3}))?\\b`, 'g');
  const attrRe = /\bclass="([^"]*)"/g;
  let am;
  while ((am = attrRe.exec(src))) {
    const attrStart = am.index + am[0].indexOf(am[1]);
    const value = am[1];
    let m;
    classRe.lastIndex = 0;
    while ((m = classRe.exec(value))) {
      record(m[0], attrStart + m.index);
    }
  }
}

// --- Report ------------------------------------------------------------------------
const sorted = [...findings.entries()].sort((a, b) => b[1].count - a[1].count);
const totalInstances = sorted.reduce((s, [, f]) => s + f.count, 0);
const hexEntries = sorted.filter(([v]) => v.startsWith('#'));
const rgbEntries = sorted.filter(([v]) => v.startsWith('rgb'));
const hslEntries = sorted.filter(([v]) => v.startsWith('hsl'));
const twEntries = sorted.filter(([v]) => !v.startsWith('#') && !v.startsWith('rgb') && !v.startsWith('hsl'));

if (jsonOut) {
  console.log(JSON.stringify({
    file: target,
    distinctValues: sorted.length,
    totalInstances,
    hex: { distinct: hexEntries.length, instances: hexEntries.reduce((s, [, f]) => s + f.count, 0) },
    rgb: { distinct: rgbEntries.length, instances: rgbEntries.reduce((s, [, f]) => s + f.count, 0) },
    hsl: { distinct: hslEntries.length, instances: hslEntries.reduce((s, [, f]) => s + f.count, 0) },
    tailwind: { distinct: twEntries.length, instances: twEntries.reduce((s, [, f]) => s + f.count, 0) },
    findings: sorted.map(([value, f]) => ({ value, count: f.count, lines: [...f.lines].sort((a, b) => a - b) })),
  }, null, 2));
} else {
  console.log(`palette-lint: ${target}`);
  console.log(`Distinct off-palette values: ${sorted.length}`);
  console.log(`Total off-palette instances: ${totalInstances}`);
  console.log(`  hex literals:      ${hexEntries.length} distinct / ${hexEntries.reduce((s, [, f]) => s + f.count, 0)} instances`);
  console.log(`  rgb()/rgba():      ${rgbEntries.length} distinct / ${rgbEntries.reduce((s, [, f]) => s + f.count, 0)} instances`);
  console.log(`  hsl() literals:    ${hslEntries.length} distinct / ${hslEntries.reduce((s, [, f]) => s + f.count, 0)} instances`);
  console.log(`  Tailwind classes:  ${twEntries.length} distinct / ${twEntries.reduce((s, [, f]) => s + f.count, 0)} instances`);
  console.log('');
  for (const [value, f] of sorted) {
    console.log(`${String(f.count).padStart(5)}x  ${value}`);
  }
}

// --- CI mode (--check) ---------------------------------------------------------------
// A raw "did the instance count rise" gate is the wrong invariant: reusing an
// already-covered class on more elements isn't drift, and pages get added/removed
// independent of palette compliance. What actually matters, and what this enforces:
//   1. hex/rgb()/rgba()/hsl() literals must be exactly zero -- any appearance at all is
//      a real regression, since every legitimate value has an allowed-token or
//      documented-extension form already.
//   2. every distinct Tailwind colour-utility class found in class="..." markup must have
//      a compliant #page-container override rule -- catches new markup introducing a
//      genuinely new (uncovered) off-palette class, without false-failing on reused ones.
//   3. every #page-container override's own target colour must itself be an allowed hex --
//      catches a future override rule being added with an invented/off-palette colour.
if (args.includes('--check')) {
  const failures = [];

  if (hexEntries.length || rgbEntries.length || hslEntries.length) {
    failures.push(`${hexEntries.length + rgbEntries.length + hslEntries.length} raw colour literal(s) found (hex/rgb/hsl must be zero) -- see the non-JSON report above.`);
  }

  const startPre = rawSrc.indexOf('<style id="an-theme-normalize">');
  const preEnd = startPre === -1 ? -1 : rawSrc.indexOf('</style>', startPre);
  const overrideBlock = startPre === -1 ? '' : rawSrc.slice(startPre, preEnd);

  // 2. coverage: every Tailwind class found in markup has a matching override selector.
  const uncovered = [];
  for (const [value] of twEntries) {
    const escaped = value.replace(/\//g, '\\/').replace(/:/g, '\\:');
    if (!overrideBlock.includes(`#page-container .${escaped}{`) && !overrideBlock.includes(`#page-container .${escaped}:hover{`)) {
      uncovered.push(value);
    }
  }
  if (uncovered.length) {
    failures.push(`${uncovered.length} Tailwind class(es) found in markup with no #page-container override: ${uncovered.slice(0, 10).join(', ')}${uncovered.length > 10 ? ', …' : ''}`);
  }

  // 3. every override target colour is itself allowed.
  const targetHexRe = /#([0-9a-fA-F]{6})\b/g;
  const badTargets = new Map();
  let tm;
  while ((tm = targetHexRe.exec(overrideBlock))) {
    const h = '#' + tm[1].toLowerCase();
    if (!ALLOWED_HEX.has(h)) badTargets.set(h, (badTargets.get(h) || 0) + 1);
  }
  if (badTargets.size) {
    failures.push(`${badTargets.size} off-palette hex used as an override target: ${[...badTargets.keys()].join(', ')}`);
  }

  if (failures.length) {
    console.error('\npalette-lint --check: FAIL');
    failures.forEach((f) => console.error('  - ' + f));
    process.exitCode = 1;
  } else {
    console.log('\npalette-lint --check: PASS (0 raw literals, full Tailwind override coverage, all override targets allowed)');
  }
}
