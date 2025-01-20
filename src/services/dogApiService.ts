import pkg from 'file-saver';
const { saveAs } = pkg;
import type { DogBreed } from '../types/dog.types';

const API_KEY = 'live_DTBB3bETp0Zv2ZFBH3ZVaKmO9GjhBK5xXB3tS08bB6WFAroxpTotkpcQ4HlLWKTq';
const API_URL = 'https://api.thedogapi.com/v1';

const FALLBACK_BREEDS = ['Deutscher Schäferhund', 'Rottweiler', 'Dackel', 'Golden Retriever'];

export class DogApiService {
  private static instance: DogApiService;
  private breedCache: string[] | null = null;

  private constructor() {}

  public static getInstance(): DogApiService {
    if (!DogApiService.instance) {
      DogApiService.instance = new DogApiService();
    }
    return DogApiService.instance;
  }

  public async fetchDogBreeds(): Promise<string[]> {
    // Return cached breeds if available
    if (this.breedCache) {
      return this.breedCache;
    }

    try {
      const response = await fetch(`${API_URL}/breeds`, {
        headers: {
          'x-api-key': API_KEY
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch dog breeds');
      }

      const breeds: DogBreed[] = await response.json();
      
      this.breedCache = breeds.map(breed => breed.name).sort();
      return this.breedCache;

    } catch (error) {
      console.error('Error fetching dog breeds:', error);
      return FALLBACK_BREEDS;
    }
  }
}
