// pages/api/contact.js

import { connectToDatabase } from '../../lib/mongodb'; 

// --- CRITICAL FIX: The handler function MUST be exported as default. ---
export default async function handler(req, res) {
    
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`); 
    }
    
    // Database Connection and Logic (which we assume is working based on your logs)
    let database;
    try {
        const { db } = await connectToDatabase();
        database = db;
    } catch (error) {
        return res.status(500).json({ success: false, message: "Could not establish database connection." });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        await database.collection('messages').insertOne({
            name,
            email,
            message,
            date: new Date(),
        });

        // Retained simulation logic
        if (Math.random() < 0.2) { 
            return res.status(500).json({ success: false, message: "Simulated transmission failure." });
        }
        
        return res.status(201).json({ success: true, message: "Message sent successfully!" });

    } catch (error) {
        console.error("Error saving message:", error);
        return res.status(500).json({ success: false, message: "Internal server error during save operation." });
    }
}