// src/pages/api/kibble-recommendations.ts
import type { APIRoute } from 'astro';
import type { DogData } from '../../types/kibble';
import { getKibbleRecommendations } from '../../lib/kibbleService';

export const prerender = false;

const USE_TEST_DATA = false; // Auf false setzen für Produktivbetrieb

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('API Route wurde aufgerufen');

    const dogData = await request.json() as DogData;
    console.log('Empfangene Daten:', dogData);

    if (USE_TEST_DATA) {
      // Test-Response wie bisher...
      const testResponse = [/* ... deine Test-Daten ... */];
      return new Response(JSON.stringify(testResponse), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      });
    } else {
      console.log('Starte MongoDB-Abfrage...');
      const recommendations = await getKibbleRecommendations(dogData);
      console.log('MongoDB Empfehlungen:', recommendations);

      return new Response(JSON.stringify(recommendations), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      });
    }
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({
      error: 'Internal Server Error',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
