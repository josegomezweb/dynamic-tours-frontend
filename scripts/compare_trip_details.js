import fs from 'node:fs';

const authHtml = fs.readFileSync('scripts/out_auth_trip.html', 'utf8');
const pubHtml = fs.readFileSync('scripts/out_public_trip.html', 'utf8');

console.log('--- AUTH TRIP DETAIL (HALCON PRUEBA) ---');
const authHeader = authHtml.match(/<div class="[^"]*header[^"]*"[\s\S]*?<\/div>/i);
console.log('Auth header length:', authHeader ? authHeader[0].length : 0);

// Check booking button or price breakdown
const authButtons = [...authHtml.matchAll(/<(?:a|button)[^>]+class="[^"]*(?:btn|boton|reserva|presupuesto|descarga)[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)]
  .map(m => m[0].replace(/\s+/g, ' '));
console.log('Auth CTA buttons found:');
console.log(authButtons.slice(0, 15));

console.log('\n--- PUBLIC TRIP DETAIL ---');
const pubButtons = [...pubHtml.matchAll(/<(?:a|button)[^>]+class="[^"]*(?:btn|boton|reserva|presupuesto|descarga)[^"]*"[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)]
  .map(m => m[0].replace(/\s+/g, ' '));
console.log('Public CTA buttons found:');
console.log(pubButtons.slice(0, 15));
