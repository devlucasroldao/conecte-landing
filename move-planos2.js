const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');

// Verify expected content at key lines (1-indexed → 0-indexed)
const checks = [
  [3910, '<!-- ==='],               // start of DIFERENCIAIS comment
  [3913, '<!-- ==='],               // start of PLANOS comment
  [3916, '<section class="planos"'], // planos section start
  [4073, '</section>'],             // planos section end
  [4074, ''],                        // empty line after planos
  [4075, '<section class="diferenciais">'], // diferenciais start
  [4112, '</section>'],             // diferenciais end
  [4114, '<!-- ==='],               // IDENTIDADE comment
  [4176, '</section>'],             // veranistas end
  [4180, '<!-- ==='],               // COMO FUNCIONA comment
];

let valid = true;
for (const [idx, expected] of checks) {
  const actual = lines[idx] ? lines[idx].trim() : '';
  if (!actual.startsWith(expected.trim())) {
    console.log(`FAIL at line ${idx+1}: expected "${expected}", got "${actual.substring(0,60)}"`);
    valid = false;
  }
}

if (!valid) {
  console.log('Line number verification failed — aborting.');
  process.exit(1);
}

console.log('Line checks passed.');

// 0-indexed slices:
const before   = lines.slice(0, 3910);       // lines 1–3910
const blockA   = lines.slice(3910, 3913);    // lines 3911–3913: <!-- DIFERENCIAIS comment -->
const blockB   = lines.slice(3913, 4074);    // lines 3914–4074: <!-- PLANOS comment --> + <section planos>
const emptyA   = lines.slice(4074, 4075);    // line 4075: empty after planos
const blockD   = lines.slice(4075, 4113);    // lines 4076–4113: <section diferenciais>
const blockE   = lines.slice(4113, 4180);    // lines 4114–4180: empty + identidade + veranistas + 3 empties
const rest     = lines.slice(4180);          // lines 4181+: <!-- COMO FUNCIONA --> + rest

// New order: diferenciais → identidade → veranistas → planos → como
const newLines = [
  ...before,
  ...blockA,   // <!-- DIFERENCIAIS comment -->
  ...blockD,   // <section class="diferenciais">
  ...blockE,   // empty + identidade + veranistas + empty lines
  ...blockB,   // <!-- PLANOS comment --> + <section class="planos">
  ...emptyA,   // empty line
  ...rest,     // <!-- COMO FUNCIONA --> + rest
];

const newHtml  = newLines.join('\n');
const origHtml = lines.join('\n');

console.log('Lines:', lines.length, '→', newLines.length, '(should be same)');
console.log('Size:', origHtml.length, '→', newHtml.length, '(should be same)');

const sections = ['planos','diferenciais','identidade','veranistas','como','speedtest','bairros','faq','cta-final'];
let ok = true;
for (const s of sections) {
  if (!newHtml.includes(`class="${s}"`)) { console.log('MISSING section:', s); ok = false; }
}
if (newLines.length !== lines.length)        { console.log('ERROR: line count mismatch!'); ok = false; }
if (Math.abs(newHtml.length - origHtml.length) > 5) { console.log('ERROR: size mismatch!'); ok = false; }

if (ok) {
  const order = ['diferenciais','identidade','veranistas','planos','como'].map(s => ({
    name: s,
    line: newLines.findIndex(l => l.includes(`<section class="${s}"`)) + 1,
  }));
  console.log('New section order:');
  order.forEach(({name, line}) => console.log(`  ${name}: line ${line}`));

  const inOrder = order.every((s, i) => i === 0 || s.line > order[i-1].line);
  if (inOrder) {
    fs.writeFileSync('index.html', newHtml);
    console.log('Done! index.html updated successfully.');
  } else {
    console.log('ERROR: sections not in correct order!');
  }
}
