import fs from 'node:fs';

const content = fs.readFileSync('scripts/out_mis_datos.html', 'utf8');
const form = content.match(/<form[\s\S]*?<\/form>/i);
if (form) {
  const inputs = [...form[0].matchAll(/<(?:input|select|textarea)[^>]+name="([^"]+)"[^>]*>/gi)]
    .map(m => m[0]);
  console.log('Mis Datos Fields:');
  console.log(inputs.join('\n'));
}
