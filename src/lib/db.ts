import { MongoClient } from 'mongodb';

let client: MongoClient | null = null;

/**
 * Stellt eine Singleton-Verbindung zu MongoDB her und gibt den Client zurück.
 */
export async function getMongoClient() {
  if (!client) {
    const uri = import.meta.env.MONGODB_URI; // oder process.env.MONGODB_URI, je nach Astro-Setup
    if (!uri) {
      throw new Error('Keine MONGODB_URI vorhanden!');
    }

    client = new MongoClient(uri);
    await client.connect();
    console.log('MongoClient (Singleton) connected');
  }

  return client;
}
