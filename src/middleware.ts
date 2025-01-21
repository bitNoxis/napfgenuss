import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const authHeader = context.request.headers.get('authorization');

  if (!authHeader) {
    return new Response('Authentifizierung erforderlich', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Geschützter Bereich"'
      }
    });
  }

  const [authType, credentials] = authHeader.split(' ');

  if (authType !== 'Basic') {
    return new Response('Ungültige Authentifizierungsmethode', { status: 401 });
  }

  const [username, password] = atob(credentials).split(':');

  // WICHTIG: Ersetze diese Werte durch deine gewünschten Zugangsdaten
  const EXPECTED_USERNAME = 'admin';
  const EXPECTED_PASSWORD = 'passwort123';

  if (
    username === EXPECTED_USERNAME &&
    password === EXPECTED_PASSWORD
  ) {
    return next();
  }

  return new Response('Zugriff verweigert', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Geschützter Bereich"'
    }
  });
};
