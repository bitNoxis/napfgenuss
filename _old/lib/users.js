import { Users } from "./mongodb";

export const getAllUsers = async () => {
  const users = await (await Users()).find({}).toArray();
  return users;
};

export const createUser = async (newUser) => {
  try {
    const usersCollection = await Users();
    const result = await usersCollection.insertOne(newUser);
    console.log("MongoDB insert result:", result);
    return { id: result.insertedId, ...newUser };
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};
