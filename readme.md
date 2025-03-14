# AI Toxicity Classification Platform

## Overview
ToxiScan is a full-stack application that allows users to analyze text for toxicity. It provides a secure login/signup system and integrates a toxicity detection API to classify user-submitted comments as "Toxic" or "Safe."

## Features
### User Authentication
- Secure signup and login using **bcryptjs** for password hashing.
- **JWT** authentication for session management.

### Toxic Comment Detection
- **Python API** processes user comments.
- Returns classification results as **Toxic** or **Safe.**

### Database
- **MongoDB Atlas** stores user data and analysis results.

### Responsive Design
- Clean UI for **login, signup, and comment submission.**

## How It Works
### Signup/Login
1. Users sign up or log in using their email and password.
2. Passwords are securely hashed.
3. JWT tokens are generated for user sessions.

### Comment Analysis
1. Users submit comments via the UI.
2. The Python API processes the comment.
3. The system returns a classification as **Toxic** or **Safe.**

### Session Management
- **JWT token** is used for authentication in protected routes.

## Example Workflow
### Signup
#### Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "message": "User registered successfully"
}
```

### Login
#### Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
#### Response:
```json
{
  "message": "Login successful",
  "token": "jwt_token_here"
}
```

### Comment Analysis
#### Request:
```json
{
  "comment": "This is great!"
}
```
#### Response:
```json
{
  "result":  "✅ Not Toxic: This text appears to be safe."
}
```
#### Request:
```json
{
  "comment": "(curse/foul language)"
}
```
#### Response:
```json
{
  "result":   "⚠️ Toxic: This text contains inappropriate language."
}
```

## Setup
### Clone the repository:
```bash
git clone https://github.com/MandarVade/MEGAHACK-AI-TOXIC-CLASSIFICATION.git
cd ai-toxicity-platform
```
### Install dependencies:
```bash
npm install
```
### Create a `.env` file:
```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000

```
### Start the server:
```bash
npm start
```


