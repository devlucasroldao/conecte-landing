const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// Find sections by their comment block + opening tag
function findSection(name, startFrom = 0) {
  // Look for the comment separator before the section
  const sectionTag = `<section class="${name}"`;
  const idx = html.indexOf(sectionTag, startFrom);
  if (idx === -1) throw new Error(`Section "${name}" not found`);

  // Find the preceding comment block (look backwards from idx for <!--)
  let commentStart = idx;
  for (let i = idx - 1; i >= Math.max(0, idx - 500); i--) {
    if (html[i] === '<' && html.substring(i, i+4) === '<!--') {
      commentStart = i;
      break;
    }
  }

  // Find the section end: next comment block OR next section tag
  const nextComment = html.indexOf('\n<!-- ===', idx + 1);
  const end = nextComment !== -1 ? nextComment : html.length;

  return { start: commentStart, end, content: html.substring(commentStart, end) };
}

const planos = findSection('planos');
const diferenciais = findSection('diferenciais');
const identidade = findSection('identidade');
const veranistas = findSection('veranistas');
const como = findSection('como');

console.log('planos:', planos.start, '-', planos.end, '(', planos.content.length, 'chars)');
console.log('diferenciais:', diferenciais.start, '-', diferenciais.end);
console.log('identidade:', identidade.start, '-', identidade.end);
console.log('veranistas:', veranistas.start, '-', veranistas.end);
console.log('como:', como.start, '-', como.end);

// Verify current order: planos should come before diferenciais
if (planos.start > diferenciais.start) {
  console.log('ERROR: planos is already after diferenciais!');
  process.exit(1);
}

// Build new HTML:
// [before planos] + [diferenciais] + [identidade] + [veranistas] + [planos] + [como and rest]
const before = html.substring(0, planos.start);
const afterComo = html.substring(como.start);

const newHtml = before
  + diferenciais.content
  + identidade.content
  + veranistas.content
  + planos.content
  + afterComo;

// Sanity checks
const checks = ['planos', 'diferenciais', 'identidade', 'veranistas', 'como', 'speedtest', 'bairros', 'faq', 'cta-final'];
let ok = true;
for (const s of checks) {
  if (!newHtml.includes(`class="${s}"`)) { console.log('MISSING:', s); ok = false; }
}

if (Math.abs(newHtml.length - html.length) > 10) {
  console.log('ERROR: size mismatch!', html.length, 'vs', newHtml.length);
  ok = false;
}

if (ok) {
  fs.writeFileSync('index.html', newHtml);
  console.log('Done! New order verified.');

  // Show new order
  const sections = ['diferenciais','identidade','veranistas','planos','como','speedtest'];
  sections.forEach(s => {
    const idx = newHtml.indexOf(`class="${s}"`);
    console.log(`  ${s}: pos ${idx}`);
  });
}
