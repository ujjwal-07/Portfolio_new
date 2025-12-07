// backend/server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- Middleware Setup ---
// Enable CORS for frontend communication (crucial for local development)
const allowedOrigins = [
    'http://localhost:3000', // Your Next.js frontend default port
    // Add your production frontend URL here when deploying
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

// Body parser to handle JSON data
app.use(express.json());

// --- Database Connection ---
const client = new MongoClient(MONGODB_URI, {
});

let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('ContactDB'); // Replace 'ContactDB' if you prefer a different database name
        console.log("Successfully connected to MongoDB Atlas!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Exit process if connection fails
        process.exit(1); 
    }
}

// --- API Route ---
app.post('/api/contact', async (req, res) => {
    if (!db) {
        return res.status(500).json({ success: false, message: "Database not connected." });
    }

    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    try {
        const result = await db.collection('messages').insertOne({
            name,
            email,
            message,
            date: new Date(),
        });

        // Simulating 20% failure chance as per your frontend code
        if (Math.random() < 0.2) { 
            return res.status(500).json({ success: false, message: "Simulated transmission failure." });
        }
        
        console.log("Message saved:", result.insertedId);
        res.status(201).json({ success: true, message: "Message sent successfully!" });

    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ success: false, message: "Internal server error during save operation." });
    }
});

// --- Server Startup ---
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});