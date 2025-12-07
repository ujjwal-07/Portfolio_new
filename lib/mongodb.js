// lib/mongodb.js
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let client;
let db;

// Export the function to connect and retrieve the client/database instance
export async function connectToDatabase() {
  if (db) return { client, db };
  
  try {
    // Note: The second parameter for options is unnecessary for modern MongoDB clients.
    client = new MongoClient(MONGODB_URI); 
    await client.connect();
    // Use the database name defined in your Express server
    db = client.db('ContactDB'); 
    console.log("MongoDB Client connected successfully.");
    return { client, db };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}