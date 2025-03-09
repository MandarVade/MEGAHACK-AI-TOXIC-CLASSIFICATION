import express from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"; 
import bodyParser from "body-parser"; 

// ✅ Specify the correct path to the .env file
dotenv.config({ path: "../../Backend/.env" });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Get MongoDB URI from .env
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error("❌ MongoDB URI is missing. Check your .env file.");
    process.exit(1);
}

// ✅ Connect to MongoDB Atlas
connect(mongoURI, { retryWrites: true, w: "majority" })
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.error("❌ MongoDB Connection Error:", err);
        process.exit(1);
    });

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
        console.error("❌ Signup Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// ✅ Get JWT Secret from .env
const jwtSecret = process.env.JWT_SECRET;

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
            return res.status(400).json({ message: "Invalid email" });
        }

        // Compare password
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: "1h" });

        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
