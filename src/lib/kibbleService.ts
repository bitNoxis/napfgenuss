// src/lib/kibbleService.ts
import type { DogData, Kibble, KibbleDocument } from '../types/kibble';
import { getMongoClient } from './db';  // <-- Import aus deiner neuen db.ts

// Lies den DB-Namen aus import.meta.env.DB_NAME oder nimm "Database" als Fallback
const DB_NAME = import.meta.env.DB_NAME || 'Database';
const COLLECTION_NAME = 'Kibbles';

/**
 * Hauptfunktion: empfängt DogData, lädt Kibbles aus Mongo, wendet Scoring an und gibt Top 3 zurück.
 */
export async function getKibbleRecommendations(dogData: DogData): Promise<Kibble[]> {
  try {
    console.log('MONGODB_URI:', import.meta.env.MONGODB_URI);

    // 1) Hol dir den Singleton-Client
    const client = await getMongoClient();
    const database = client.db(DB_NAME);
    const kibbles = database.collection<KibbleDocument>(COLLECTION_NAME);

    // 2) Alle Dokumente holen
    const allKibbles = await kibbles.find().toArray();

    // 3) Scoring-Logik
    const scoredKibbles = allKibbles.map((kibble) => {
      let score = 0;

      // Beispiel-Checks:
      if (dogData.healthIssues.includes('allergies')) {
        if (kibble.Hypoallergen === 'Ja') score += 3;
        if (kibble.Proteinquelle === 'Ente' || kibble.Proteinquelle === 'Pute') score += 2;
      }

      if (dogData.healthIssues.includes('digestion')) {
        if (typeof kibble.Verdauungsförderung === 'number') {
          score += kibble.Verdauungsförderung;
        }
        if (
          Array.isArray(kibble['Empfohlen für']) &&
          kibble['Empfohlen für'].includes('Verdauungsproblemen')
        ) {
          score += 2;
        }
      }

      // ... alle weiteren Checks (Gelenkprobleme, Fell & Haut, usw.) ...

      // Größen-Check
      const dogSize = getDogSize(dogData);
      if (
        dogSize &&
        Array.isArray(kibble['Geeignet für']) &&
        kibble['Geeignet für'].includes(dogSize)
      ) {
        score += 2;
      }

      return { ...kibble, score };
    });

    // 4) Sortierung und Top-3
    scoredKibbles.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    return scoredKibbles.slice(0, 3);
  } catch (error) {
    console.error('Fehler beim Abrufen der Kibble-Empfehlungen:', error);
    throw error;
  }
}

/**
 * Bestimmt "kleine/mittelgroße/große Hunde" basierend auf Rasse oder Gewicht.
 */
function getDogSize(dogData: DogData): string | null {
  if (dogData.breedType === 'unknown' && dogData.weight) {
    switch (dogData.weight) {
      case 'mini':
      case 'small':
        return 'kleine Hunde';
      case 'medium':
        return 'mittelgroße Hunde';
      case 'large':
      case 'giant':
        return 'große Hunde';
      default:
        return null;
    }
  }

  const largeBreeds = ['Deutscher Schäferhund', 'Rottweiler'];
  const smallBreeds = ['Dackel'];

  if (dogData.breed) {
    if (largeBreeds.includes(dogData.breed)) return 'große Hunde';
    if (smallBreeds.includes(dogData.breed)) return 'kleine Hunde';
  }

  return null;
}
