import https from 'node:https';
import querystring from 'node:querystring';
import fs from 'node:fs';

function request(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

function parseCookies(cookieHeaders) {
  if (!cookieHeaders) return {};
  const cookies = {};
  cookieHeaders.forEach(c => {
    const parts = c.split(';')[0].split('=');
    if (parts.length >= 2) cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
  });
  return cookies;
}

function serializeCookies(cookiesObj) {
  return Object.entries(cookiesObj).map(([k, v]) => `${k}=${v}`).join('; ');
}

async function inspectSections() {
  const init = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/2016-acceso',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const cookies = parseCookies(init.headers['set-cookie']);

  const postData = querystring.stringify({ usuario: 'halpru', pwd: 'halpru' });
  const loginRes = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/control_usuario.php',
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Cookie': serializeCookies(cookies),
      'Referer': 'https://www.dynamic-tours.com/2016-acceso'
    }
  }, postData);
  Object.assign(cookies, parseCookies(loginRes.headers['set-cookie']));

  const sections = [
    { name: 'Reservas y Presupuestos', path: '/mis-reservas-intranet.php' },
    { name: 'Facturas', path: '/mis-facturas-intranet.php' },
    { name: 'Mis Datos', path: '/2018-mis-datos.php' },
    { name: 'Viajes Destacados Intranet', path: '/destacado.php' }
  ];

  for (const s of sections) {
    console.log(`\n========================================`);
    console.log(`INSPECTING: ${s.name} (${s.path})`);
    console.log(`========================================`);
    const res = await request({
      hostname: 'www.dynamic-tours.com',
      path: s.path,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': serializeCookies(cookies)
      }
    });
    console.log('Status:', res.statusCode, 'Length:', res.body.length);

    // Check tables or forms
    const tables = res.body.match(/<table[\s\S]*?<\/table>/gi) || [];
    console.log('Tables found:', tables.length);
    if (tables.length > 0) {
      console.log('Table header / sample:', tables[0].substring(0, 500).replace(/\s+/g, ' '));
    }

    // Check forms or inputs
    const forms = res.body.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms found:', forms.length);

    // Check headings
    const h12 = [...res.body.matchAll(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi)]
      .map(m => m[1].replace(/<[^>]+>/g, '').trim())
      .filter(t => t.length > 0);
    console.log('Headings:', h12.slice(0, 6));

    // Save section
    const safeName = s.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    fs.writeFileSync(`scripts/out_${safeName}.html`, res.body);
  }
}

inspectSections().catch(console.error);
