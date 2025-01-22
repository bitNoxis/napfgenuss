import { getMongoClient } from './db'; 
import type { DogBreed } from '../types/dog.types';

const DB_NAME = 'Database';  
const COLLECTION_NAME = 'hunderassen';  

export class HunderassenService {
  private static instance: HunderassenService;
  private breedCache: DogBreed[] | null = null;

  private constructor() {}

  public static getInstance(): HunderassenService {
    if (!HunderassenService.instance) {
      HunderassenService.instance = new HunderassenService();
    }
    return HunderassenService.instance;
  }

  public async fetchHunderassen(): Promise<DogBreed[]> {
    // Rückgabe des gecachten Ergebnisses, falls vorhanden
    if (this.breedCache) {
      return this.breedCache;
    }

    try {
      const client = await getMongoClient();
      const database = client.db(DB_NAME);
      const collection = database.collection<DogBreed>(COLLECTION_NAME);

      // Hole alle Dokumente mit den Feldern nameDE und image
      const breeds = await collection.find({}, { projection: { nameDE: 1, image: 1 } }).toArray();

      this.breedCache = breeds;
      return this.breedCache;
    } catch (error) {
      console.error('Fehler beim Abrufen der Hunderassen:', error);
      throw error;
    }
  }
}
