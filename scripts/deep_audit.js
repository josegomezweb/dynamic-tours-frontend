import https from 'node:https';
import querystring from 'node:querystring';
import fs from 'node:fs';

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

async function run() {
  console.log('=== 1. LOGGING IN AS DTprueba ===');
  const init = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/2016-acceso',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const cookies = parseCookies(init.headers['set-cookie']);

  const postData = querystring.stringify({ usuario: 'DTprueba', pwd: '1' });
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

  console.log('DTprueba redirect:', loginRes.headers['location']);

  // Check /viajes-egipto
  const egiptoRes = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/viajes-egipto',
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Cookie': serializeCookies(cookies)
    }
  });

  console.log('/viajes-egipto status:', egiptoRes.statusCode, 'body length:', egiptoRes.body.length);

  // Extract destination links
  const matches = [...egiptoRes.body.matchAll(/href="([^"]*(?:destino|viaje|oferta)[^"]*)"/gi)]
    .map(m => m[1])
    .filter(h => h.startsWith('destino-') || h.startsWith('viaje-'));
  
  const uniqueHrefs = [...new Set(matches)];
  console.log('Found trip links in /viajes-egipto:', uniqueHrefs.slice(0, 10));

  if (uniqueHrefs.length > 0) {
    const tripPath = '/' + uniqueHrefs[0];
    console.log('\n=== 2. VISITING TRIP DETAIL:', tripPath, '===');
    const tripRes = await request({
      hostname: 'www.dynamic-tours.com',
      path: tripPath,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': serializeCookies(cookies)
      }
    });

    console.log('Trip detail status:', tripRes.statusCode, 'length:', tripRes.body.length);
    fs.writeFileSync('scripts/out_dt_trip_detail.html', tripRes.body);

    // Extract forms, booking buttons, cotizador
    const forms = tripRes.body.match(/<form[\s\S]*?<\/form>/gi) || [];
    console.log('Forms on trip detail:', forms.length);
    forms.forEach((f, idx) => {
      const action = f.match(/action="([^"]*)"/i)?.[1];
      const method = f.match(/method="([^"]*)"/i)?.[1];
      console.log(`Form #${idx}: action="${action}" method="${method}"`);
      const inputs = [...f.matchAll(/<(?:input|select|button)[^>]+name="([^"]+)"[^>]*>/gi)].map(m => m[1]);
      console.log(`  Inputs in form #${idx}:`, inputs);
    });

    // Check pricing blocks & booking triggers
    const bookingTriggers = [...tripRes.body.matchAll(/<(?:a|button|input)[^>]+(?:reserv|cotiz|presupuest|precio|descarg)[^>]*>([\s\S]*?)<\/(?:a|button)>/gi)]
      .map(m => m[0].replace(/\s+/g, ' ').substring(0, 120));
    console.log('\nBooking / Pricing buttons found:');
    console.log(bookingTriggers.slice(0, 10));
  }

  // Check admin dashboard
  console.log('\n=== 3. LOGGING IN AS ADMIN (jose) ===');
  const initAdmin = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/2016-acceso',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  const adminCookies = parseCookies(initAdmin.headers['set-cookie']);

  const adminPost = querystring.stringify({ usuario: 'jose', pwd: 'denada2026' });
  const adminLoginRes = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/control_usuario.php',
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(adminPost),
      'Cookie': serializeCookies(adminCookies),
      'Referer': 'https://www.dynamic-tours.com/2016-acceso'
    }
  }, adminPost);
  Object.assign(adminCookies, parseCookies(adminLoginRes.headers['set-cookie']));

  const adminTarget = adminLoginRes.headers['location'];
  console.log('Admin redirect:', adminTarget);

  if (adminTarget) {
    const adminDash = await request({
      hostname: 'www.dynamic-tours.com',
      path: adminTarget.startsWith('/') ? adminTarget : '/' + adminTarget,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Cookie': serializeCookies(adminCookies)
      }
    });
    console.log('Admin dashboard status:', adminDash.statusCode, 'length:', adminDash.body.length);
    fs.writeFileSync('scripts/out_admin_dashboard.html', adminDash.body);

    const title = adminDash.body.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
    console.log('Admin page title:', title);

    // Extract admin menu items
    const adminMenu = [...adminDash.body.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
      .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
      .filter(m => m.text && !m.href.startsWith('#') && !m.href.startsWith('javascript'));
    console.log('Admin menu links sample:', adminMenu.slice(0, 20));
  }
}

run().catch(console.error);
