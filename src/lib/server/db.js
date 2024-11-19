import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://muhammadabozaid77:muhammadabozaid77@cluster0.era66.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );

  return client;
}
