// require("dotenv").config();

import express from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import { genSalt, hash, compare } from "bcryptjs";
import pkgi  from "jsonwebtoken";
import { configDotenv } from "dotenv"; 
import pkg from 'body-parser';
const { json } = pkg;
const {sign} = pkg;

configDotenv.apply();

const app = express();
app.use(cors());
app.use(json());

// ✅ Get MongoDB URI from .env
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MongoDB URI is missing. Check your .env file.");
    process.exit(1);
}

// ✅ Connect to MongoDB Atlas
connect(mongoURI, { retryWrites: true, w: "majority" })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = model("User", userSchema);

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            alert("user exists");
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);

        // Create new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

const jwtSecret = process.env.JWT_SECRET;
console.log(jwtSecret)
if (!jwtSecret) {
    console.error("❌ JWT_SECRET is missing. Check your .env file.");
    process.exit(1);
}

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid emais" });
        }

        // Compare password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if(isMatch){
            console.log("is ma      ")
        }

        // Generate JWT token
        const token = sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});