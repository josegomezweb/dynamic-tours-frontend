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

async function inspect() {
  console.log('--- 1. PUBLIC TRIP LISTING & DETAIL ---');
  const publicEgipto = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/viajes-egipto',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log('Public /viajes-egipto status:', publicEgipto.statusCode);
  
  // Look for prices, titles, CTAs in public /viajes-egipto
  const pricesPublic = publicEgipto.body.match(/(\d+[\.,]?\d*)\s*€/gi) || [];
  console.log('Prices found on public Egipto page:', pricesPublic.slice(0, 10));
  
  const tripCardsPublic = [...publicEgipto.body.matchAll(/<a[^>]+href="([^"]*(?:viaje|circuito|oferta)[^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(m => m.text.length > 5);
  console.log('Sample public trip links:', tripCardsPublic.slice(0, 5));

  const firstTripHref = tripCardsPublic[0]?.href || '/viaje-egipto-clasico-y-crucero-nilo';
  console.log('Visiting first trip publicly:', firstTripHref);

  const publicTripDetail = await request({
    hostname: 'www.dynamic-tours.com',
    path: firstTripHref.startsWith('/') ? firstTripHref : `/${firstTripHref}`,
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log('Public trip detail length:', publicTripDetail.body.length);
  const detailPrices = publicTripDetail.body.match(/(\d+[\.,]?\d*)\s*€/gi) || [];
  console.log('Trip detail public prices:', detailPrices.slice(0, 10));

  // Check login CTA on public trip detail
  const ctaLogin = publicTripDetail.body.match(/(?:acceso|agencia|comisi|neto|pvp|reserva)[^<]{0,100}/gi) || [];
  console.log('Public trip agency mentions:', ctaLogin.slice(0, 8));


  console.log('\n--- 2. AUTHENTICATED TRIP DETAIL AS halpru ---');
  // Login halpru
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

  console.log('Login halpru redirected to:', loginRes.headers['location']);

  // Visit intranet home
  const intranetHome = await request({
    hostname: 'www.dynamic-tours.com',
    path: `/${loginRes.headers['location']}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Cookie': serializeCookies(cookies)
    }
  });
  console.log('Intranet home length:', intranetHome.body.length);

  // Extract Intranet Header & Navigation
  const headerIntranet = intranetHome.body.match(/<header[\s\S]*?<\/header>/i) ||
                         intranetHome.body.match(/<div class="[^"]*(?:header|cabecera|menu|franja)[^"]*"[\s\S]*?<\/div>/gi) || [];
  console.log('Intranet header blocks found:', headerIntranet.length);

  // Extract intranet action buttons / agency features
  const intranetActions = [...intranetHome.body.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(m => m.text && m.text.length > 2 && !m.href.startsWith('#'));
  
  console.log('Intranet links found:');
  const uniqueLinks = [];
  const seen = new Set();
  for (const l of intranetActions) {
    if (!seen.has(l.href)) {
      seen.add(l.href);
      uniqueLinks.push(l);
    }
  }
  console.log(uniqueLinks.slice(0, 30));

  // Visit the same trip detail while logged in as halpru
  const authTripDetail = await request({
    hostname: 'www.dynamic-tours.com',
    path: firstTripHref.startsWith('/') ? firstTripHref : `/${firstTripHref}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Cookie': serializeCookies(cookies)
    }
  });

  console.log('Auth trip detail length:', authTripDetail.body.length);
  const authPrices = authTripDetail.body.match(/(\d+[\.,]?\d*)\s*€/gi) || [];
  console.log('Auth trip prices:', authPrices.slice(0, 10));

  const authAgencyMentions = authTripDetail.body.match(/(?:comisi|neto|pvp|reserva|presupuesto|agencia|descuento)[^<]{0,100}/gi) || [];
  console.log('Auth trip agency mentions:', authAgencyMentions.slice(0, 10));

  // Save bodies to inspect details
  fs.writeFileSync('scripts/out_public_home.html', publicEgipto.body);
  fs.writeFileSync('scripts/out_intranet_home_halpru.html', intranetHome.body);
  fs.writeFileSync('scripts/out_public_trip.html', publicTripDetail.body);
  fs.writeFileSync('scripts/out_auth_trip.html', authTripDetail.body);
  console.log('Saved HTML dumps to scripts/out_*.html');
}

inspect().catch(console.error);
