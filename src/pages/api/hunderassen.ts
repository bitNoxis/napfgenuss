import type { APIRoute } from 'astro';
import { HunderassenService } from '~/lib/hunderassenService.ts';

export const GET: APIRoute = async () => {
  try {
    const service = HunderassenService.getInstance();
    const hunderassen = await service.fetchHunderassen();

    return new Response(JSON.stringify(hunderassen), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Fehler in /api/hunderassen:', error);
    return new Response(JSON.stringify({ error: 'Interner Serverfehler' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};
