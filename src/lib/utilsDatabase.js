import { getDB } from "../lib/mongodb"

export async function createDocument(collectionName, document) {
  const db = await getDB();
  const result = await db.collection(collectionName).insertOne(document);
  console.log(`New document created with _id: ${result.insertedId}`);
}

export async function readDocuments(collectionName, query) {
  const db = await getDB();
  const documents = await db.collection(collectionName).find(query).toArray();
  console.log('Documents found:', documents);
  return documents;
}

export async function updateDocument(collectionName, query, update) {
  const db = await getDB();
  const result = await db.collection(collectionName).updateOne(query, { $set: update });
  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
}

export async function deleteDocument(collectionName, query) {
  const db = await getDB();
  const result = await db.collection(collectionName).deleteOne(query);
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
