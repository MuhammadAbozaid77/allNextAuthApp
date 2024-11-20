import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  const client = await MongoClient.connect(uri);

  return client;
}
