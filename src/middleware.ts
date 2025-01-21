import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  try {
    const authHeader = context.request.headers.get('authorization');

    // Wenn keine Authentifizierung gefordert, Standard-Verhalten
    if (!authHeader) {
      return new Response('Authentifizierung erforderlich', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Geschützter Bereich"'
        }
      });
    }

    // Sicherstellen, dass der Header korrekt formatiert ist
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Basic') {
      return new Response('Ungültige Authentifizierung', { status: 401 });
    }

    // Base64 dekodieren
    const credentials = atob(parts[1]);
    const [username, password] = credentials.split(':');

    // Hier deine Zugangsdaten
    const EXPECTED_USERNAME = 'admin';
    const EXPECTED_PASSWORD = 'password123';

    if (username === EXPECTED_USERNAME && password === EXPECTED_PASSWORD) {
      return await next();
    }

    return new Response('Zugriff verweigert', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Geschützter Bereich"'
      }
    });
  } catch (error) {
    console.error('Middleware-Fehler:', error);
    return new Response('Interner Serverfehler', { status: 500 });
  }
};
