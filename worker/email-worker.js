/**
 * Saia Labs Email Collection Worker
 *
 * Cloudflare Worker that handles email subscriptions.
 * Stores emails in KV with the pattern: {source}:{email}
 *
 * KV Binding: EMAILS (bound to saialabs-emails namespace)
 *
 * Endpoints:
 *   POST /api/subscribe  — Subscribe an email
 *   GET  /api/subscribers — List emails for a source (requires auth)
 */

const ALLOWED_ORIGINS = [
  'https://saialabs.com',
  'https://www.saialabs.com',
];

// Also allow localhost in development
const DEV_ORIGINS = [
  'http://localhost:4321',
  'http://localhost:3000',
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin') || '';
  const allAllowed = [...ALLOWED_ORIGINS, ...DEV_ORIGINS];
  const isAllowed = allAllowed.some((o) => origin === o);

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
  };
}

function jsonResponse(data, status = 200, request) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(request),
    },
  });
}

// Simple email regex — not meant to be exhaustive
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default {
  async fetch(request, env) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request),
      });
    }

    const url = new URL(request.url);

    // POST /api/subscribe
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { email, source } = body;

        // Validate
        if (!email || !isValidEmail(email)) {
          return jsonResponse({ error: 'Invalid email address.' }, 400, request);
        }

        if (!source || typeof source !== 'string' || source.length > 100) {
          return jsonResponse({ error: 'Invalid source.' }, 400, request);
        }

        // Sanitize
        const cleanEmail = email.toLowerCase().trim();
        const cleanSource = source.toLowerCase().replace(/[^a-z0-9-]/g, '');

        // Store in KV: key = "{source}:{email}", value = metadata JSON
        const key = `${cleanSource}:${cleanEmail}`;
        const value = JSON.stringify({
          email: cleanEmail,
          source: cleanSource,
          timestamp: new Date().toISOString(),
          country: request.cf?.country || 'unknown',
        });

        await env.EMAILS.put(key, value);

        return jsonResponse({ success: true, message: 'Subscribed!' }, 200, request);
      } catch (err) {
        return jsonResponse({ error: 'Invalid request body.' }, 400, request);
      }
    }

    // GET /api/subscribers?source=general
    if (url.pathname === '/api/subscribers' && request.method === 'GET') {
      // Simple auth via secret header
      const authHeader = request.headers.get('Authorization');
      if (!authHeader || authHeader !== `Bearer ${env.ADMIN_SECRET}`) {
        return jsonResponse({ error: 'Unauthorized.' }, 401, request);
      }

      const source = url.searchParams.get('source');
      if (!source) {
        return jsonResponse({ error: 'Source parameter required.' }, 400, request);
      }

      const cleanSource = source.toLowerCase().replace(/[^a-z0-9-]/g, '');
      const list = await env.EMAILS.list({ prefix: `${cleanSource}:` });

      const subscribers = await Promise.all(
        list.keys.map(async (key) => {
          const val = await env.EMAILS.get(key.name);
          return val ? JSON.parse(val) : null;
        })
      );

      return jsonResponse(
        { source: cleanSource, count: subscribers.length, subscribers: subscribers.filter(Boolean) },
        200,
        request
      );
    }

    return jsonResponse({ error: 'Not found.' }, 404, request);
  },
};
