import { MongoClient } from "mongodb";

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}

const uri = import.meta.env.MONGODB_URI;
const dbName = import.meta.env.MONGODB_DB_NAME;

console.log("Connecting to MongoDB with URI:", uri);
console.log("Using database:", dbName);

const options = {};
let cachedMongo = null;

const connectToDB = async () => {
  try {
    const mongo = await new MongoClient(uri, options).connect();
    console.log("Connected to MongoDB");
    return mongo.db(dbName);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const getDB = async () => {
  if (import.meta.env.NODE_ENV === "development") {
    if (!cachedMongo) {
      cachedMongo = await connectToDB();
    }
    return cachedMongo;
  }
  return connectToDB();
};

export const Users = async () => {
  const db = await getDB();
  return db.collection("users");
};

if (!import.meta.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}


