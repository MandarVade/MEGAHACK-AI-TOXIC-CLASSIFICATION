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
  "result": "Safe"
}
```

## Setup
### Clone the repository:
```bash
git clone https://github.com/your-username/ai-toxicity-platform.git
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
PYTHON_API_URL=http://localhost:8000/analyze
```
### Start the server:
```bash
npm start
```

## API Endpoints
### Signup: `POST /signup`
Registers a new user.

### Login: `POST /login`
Authenticates a user and returns a JWT token.

### Analyze Comment: `POST /analyze`
Sends a comment to the Python API for classification.

## Frontend Structure
### HTML
- **`index.html`**: Login/signup forms.
- **`dashboard.html`**: Comment submission and results display.

### CSS
- **`login.css`**: Styles for all pages.

### JavaScript
- **`login.js`**: Handles login/signup logic.
- **`dashboard.js`**: Manages comment submission and display.

## Backend Structure
### Server
- **`server.js`**: Manages API requests and database interactions.

### Models
- **`User.js`**: Defines the user schema.
- **`Comment.js`**: Defines the comment analysis schema.

### Routes
- **`/signup`**, **`/login`**, **`/analyze`**

## Python API
This API processes comments and classifies them as **Toxic** or **Safe.**

### Example Code:
```python
from flask import Flask, request, jsonify

app = Flask(__name__)

def analyze_comment(comment):
    if "hate" in comment.lower():
        return "Toxic"
    return "Safe"

@app.route('/analyze', methods=['POST'])
def analyze():
    comment = request.json.get('comment')
    result = analyze_comment(comment)
    return jsonify({"result": result})

if __name__ == '__main__':
    app.run(port=8000)
```

## Environment Variables
| Variable       | Description                                      | Example                                    |
|---------------|--------------------------------------------------|--------------------------------------------|
| `MONGO_URI`   | MongoDB Atlas connection string                 | `mongodb+srv://user:password@cluster0.mongodb.net/dbname` |
| `JWT_SECRET`  | Secret key for JWT token generation             | `your_jwt_secret_key`                      |
| `PORT`        | Port for the backend server                     | `5000`                                     |
| `PYTHON_API_URL` | URL of the Python toxicity analysis API      | `http://localhost:8000/analyze`           |

## License
MIT License. See **LICENSE** for details.

---
This README provides a comprehensive guide to setting up, using, and understanding **ToxiScan**. Let me know if you need any refinements! 🚀

