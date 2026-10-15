import fs from 'node:fs';

const html = fs.readFileSync('scripts/out_dt_trip_detail.html', 'utf8');

console.log('=== TRIP DETAIL INSPECTION ===');
// Title
const title = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim();
console.log('H1 Title:', title);

// Extract tabs or sections
const sections = [...html.matchAll(/<section[^>]*class="([^"]*)"[^>]*>/gi)].map(m => m[1]);
console.log('Sections classes:', sections);

// Pricing / Cotizador block
const cotizador = html.match(/<form[^>]+action="\/resumen-oferta.php"[\s\S]*?<\/form>/i);
if (cotizador) {
  console.log('\n=== FORM ACTION /resumen-oferta.php SNIPPET ===');
  console.log(cotizador[0].substring(0, 1500));
}

// Check how prices, hotel categories, dates are rendered
const priceTables = html.match(/<table[\s\S]*?<\/table>/gi) || [];
console.log('\nTables found in detail:', priceTables.length);
priceTables.forEach((t, i) => {
  console.log(`Table #${i} snippet:`, t.substring(0, 300).replace(/\s+/g, ' '));
});

// Check PDF download buttons
const pdfLinks = [...html.matchAll(/<a[^>]+href="([^"]*pdf[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
  .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));
console.log('\nPDF Links found:', pdfLinks.slice(0, 5));
