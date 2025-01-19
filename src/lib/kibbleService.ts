// src/lib/kibbleService.ts
import { MongoClient } from 'mongodb';
import type { DogData, Kibble, KibbleDocument } from '../types/kibble';

// Nutze import.meta.env.* (Astro liest so die .env-Variablen)
const client = new MongoClient(import.meta.env.MONGODB_URI);
const DB_NAME = import.meta.env.DB_NAME || 'Database';
const COLLECTION_NAME = 'Kibbles';

export async function getKibbleRecommendations(dogData: DogData): Promise<Kibble[]> {
  try {
    // Prüfen, ob URI wirklich geladen wurde
    console.log('MONGODB_URI:', import.meta.env.MONGODB_URI);

    // Verbindung herstellen
    await client.connect();
    const database = client.db(DB_NAME);
    const kibbles = database.collection<KibbleDocument>(COLLECTION_NAME);

    // Alle Dokumente aus der Kibbles-Collection laden
    const allKibbles = await kibbles.find().toArray();

    // Kibbles durchgehen und Scoring anwenden
    const scoredKibbles = allKibbles.map((kibble) => {
      let score = 0;

      // --- Allergien ---
      if (dogData.healthIssues.includes('allergies')) {
        if (kibble.Hypoallergen === 'Ja') score += 3;
        if (kibble.Proteinquelle === 'Ente' || kibble.Proteinquelle === 'Pute') score += 2;
      }

      // --- Verdauungsprobleme ---
      if (dogData.healthIssues.includes('digestion')) {
        // Wenn Verdauungsförderung ein Zahlenwert ist, addiere ihn
        if (typeof kibble.Verdauungsförderung === 'number') {
          score += kibble.Verdauungsförderung;
        }
        // Prüfe sicher, ob "Empfohlen für" ein Array ist
        if (Array.isArray(kibble['Empfohlen für']) && kibble['Empfohlen für'].includes('Verdauungsproblemen')) {
          score += 2;
        }
      }

      // --- Gelenkprobleme ---
      if (dogData.healthIssues.includes('joints')) {
        if (kibble.Gelenkunterstützung === 'Ja') score += 3;
        if (Array.isArray(kibble['Empfohlen für']) && kibble['Empfohlen für'].includes('Hunde mit Gelenkproblemen')) {
          score += 2;
        }
      }

      // --- Fell & Haut ---
      if (dogData.healthIssues.includes('skin')) {
        // Fell- und Hautgesundheit kann ein Zahlenwert sein
        if (typeof kibble['Fell- und Hautgesundheit'] === 'number') {
          score += kibble['Fell- und Hautgesundheit'];
        }
        // Prüfe "Ziel" auf Fellglanz oder Hautgesundheit
        if (
          Array.isArray(kibble['Ziel']) &&
          kibble['Ziel'].some((goal) => ['Fellglanz', 'Hautgesundheit'].includes(goal))
        ) {
          score += 2;
        }
      }

      // --- Gewichtsmanagement ---
      if (dogData.bodyCondition === 'overweight' || dogData.bodyCondition === 'obese') {
        if (kibble.Fettgehalt === 1) score += 3;
        if (Array.isArray(kibble['Ziel']) && kibble['Ziel'].includes('Gewichtskontrolle')) {
          score += 2;
        }
      }

      // --- Aktivitätslevel ---
      if (dogData.activityLevel === 'high') {
        if (kibble.Energiegehalt === 3) score += 2;
        if (Array.isArray(kibble['Empfohlen für']) && kibble['Empfohlen für'].includes('Sport- und Arbeitshunde')) {
          score += 2;
        }
      }

      // --- Alter ---
      if (dogData.age.years > 7) {
        if (kibble.Seniorenunterstützung === 'Ja') score += 2;
        if (Array.isArray(kibble['Empfohlen für']) && kibble['Empfohlen für'].includes('Senioren')) {
          score += 2;
        }
      }

      // --- Größenspezifische Empfehlungen ---
      const dogSize = getDogSize(dogData);
      if (dogSize && Array.isArray(kibble['Geeignet für']) && kibble['Geeignet für'].includes(dogSize)) {
        score += 2;
      }

      // Das Kibble-Dokument mit Score zurückgeben
      return { ...kibble, score };
    });

    // Ergebnisse nach Score sortieren, Top 3 zurück
    return scoredKibbles
      .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
      .slice(0, 3);

  } catch (error) {
    console.error('Fehler beim Abrufen der Kibble-Empfehlungen:', error);
    throw error;
  } finally {
    // Verbindung trennen
    await client.close();
  }
}

// Hilfsfunktion: Ermittelt "kleine/mittelgroße/große Hunde" basierend auf Rasse oder Gewicht
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
