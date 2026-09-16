import https from 'node:https';
import querystring from 'node:querystring';

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
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

function parseCookies(cookieHeaders) {
  if (!cookieHeaders) return {};
  const cookies = {};
  cookieHeaders.forEach(c => {
    const parts = c.split(';')[0].split('=');
    if (parts.length >= 2) {
      cookies[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
  });
  return cookies;
}

function serializeCookies(cookiesObj) {
  return Object.entries(cookiesObj).map(([k, v]) => `${k}=${v}`).join('; ');
}

async function testUser(username, password) {
  console.log(`\n========================================`);
  console.log(`TESTING LOGIN FOR: ${username}`);
  console.log(`========================================`);

  // Step 1: Initial GET to get session cookie
  const initRes = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/2016-acceso',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const cookies = parseCookies(initRes.headers['set-cookie']);
  console.log('Initial cookies:', cookies);

  // Step 2: POST login to control_usuario.php
  const postData = querystring.stringify({
    usuario: username,
    pwd: password
  });

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

  console.log('Login response status:', loginRes.statusCode);
  console.log('Login response headers location:', loginRes.headers['location']);
  const newCookies = parseCookies(loginRes.headers['set-cookie']);
  Object.assign(cookies, newCookies);
  console.log('Updated cookies:', cookies);

  // If redirect or 200, inspect destination
  const targetPath = loginRes.headers['location'] || '/2016-home-agencias.php';
  console.log('Target path after login:', targetPath);

  const homeAgencias = await request({
    hostname: 'www.dynamic-tours.com',
    path: targetPath.startsWith('/') ? targetPath : `/${targetPath}`,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Cookie': serializeCookies(cookies)
    }
  });

  console.log('Agency Home status:', homeAgencias.statusCode);
  console.log('Agency Home body length:', homeAgencias.body.length);
  
  // Look for titles, agency name, navigation links, branding
  const title = homeAgencias.body.match(/<title>([\s\S]*?)<\/title>/i);
  console.log('Page title:', title ? title[1].trim() : 'N/A');

  // Look for logo
  const logos = homeAgencias.body.match(/<img[^>]+logo[^>]+>/gi) || [];
  console.log('Logos found:', logos);

  // Look for user or agency mentions
  const agencyGreeting = homeAgencias.body.match(/(?:Hola|Bienvenido|Agencia|Usuario)[^<]{1,60}/gi) || [];
  console.log('Greetings/User info:', agencyGreeting.slice(0, 5));

  // Menu links
  const menuLinks = homeAgencias.body.match(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi) || [];
  console.log(`Total links found: ${menuLinks.length}`);
  
  // Extract distinct clean link texts and hrefs in navigation
  const navMatches = [...homeAgencias.body.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
    .filter(m => m.text && !m.href.startsWith('#') && !m.href.startsWith('javascript'));
  
  console.log('Sample navigation links:', navMatches.slice(0, 20));

  return { targetPath, body: homeAgencias.body, cookies };
}

async function inspectRegistrationFull() {
  const regRes = await request({
    hostname: 'www.dynamic-tours.com',
    path: '/2018-registro-agencias',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  const formMatch = regRes.body.match(/<form[^>]+name="form_agencias"[\s\S]*?<\/form>/i);
  if (formMatch) {
    const inputs = [...formMatch[0].matchAll(/<(input|select|textarea)[^>]+name="([^"]+)"[^>]*>/gi)]
      .map(m => ({ tag: m[1], name: m[2] }));
    console.log('\n--- REGISTRATION FORM FIELDS ---');
    console.log(inputs);
  }
}

async function main() {
  await inspectRegistrationFull();

  // Test DTprueba
  const dtRes = await testUser('DTprueba', 'DTprueba');
  
  // Test halpru
  const halRes = await testUser('halpru', 'halpru');
}

main().catch(console.error);
