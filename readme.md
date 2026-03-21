# ToxiScan - AI Toxicity Classification Platform

ToxiScan is a full-stack application that analyzes text for toxicity. It offers a secure login/signup system and an AI-powered detection API to classify incoming comments as safe or toxic in real-time.

---

## 🏗 Architecture & Technical Overview

This project uses a decoupled, dual-backend architecture to securely handle user authentication while providing fast Machine Learning inference. 

1. **Frontend (Static UI)**: Vanilla HTML, CSS, and JS. The client directly interfaces with both backend services via REST API calls. 
2. **Auth Service (Node.js)**: Runs locally on port `5000`. Built with Express and MongoDB. It handles user registration, securely hashes passwords using `bcryptjs`, issues `JWT` tokens for session management, and verifies if user accounts exist.
3. **AI Inference Service (Python)**: Runs locally on port `8000`. Built with FastAPI. It loads pre-trained scikit-learn machine learning models from disk and exposes the `/predict` endpoint for low-latency text classification.

## 🧠 How the Toxicity Model Works

To determine whether a piece of text is "Toxic" (inappropriate/foul language) or "Non-Toxic" (safe), the platform utilizes a classical Natural Language Processing (NLP) pipeline running on the Python backend:

1. **Text Transformation (TF-IDF)**: When a comment is submitted by the user, the FastAPI server passes the raw string to a pre-trained **TF-IDF Vectorizer** (Term Frequency-Inverse Document Frequency). This algorithm converts the text into a mathematical array of numbers, weighing the importance of specific words while filtering out common English filler words.
2. **Multinomial Naive Bayes Classification**: The vectorized array is fed into a trained **MultinomialNB** machine learning model. This is a probabilistic algorithm heavily optimized for text classification. It computes the statistical probability that the sequence of words belongs to the "Toxic" category based on the dataset it was originally trained on.
3. **Binary Inference**: The model outputs a definitive `1` (Toxic) or `0` (Non-Toxic). The Python server instantly formats this into a JSON payload and returns it to the frontend, which updates the chat interface accordingly.

---

## 💻 Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Fetch API)
- **Auth Backend**: Node.js, Express, MongoDB (Mongoose), JWT, bcryptjs
- **Machine Learning Backend**: Python 3.x, FastAPI, Uvicorn, scikit-learn, pickle
- **ML Models**: Multinomial Naive Bayes, TF-IDF Vectorizer (`.pkt` files)

---

## ⚙️ Quick Setup

### 1. Clone the repository
```bash
git clone https://github.com/MandarVade/MEGAHACK-AI-TOXIC-CLASSIFICATION.git
cd MEGAHACK-AI-TOXIC-CLASSIFICATION
```

### 2. Start Auth Server (Node.js)
```bash
cd Backend
npm install
cp .env.example .env  # Update MongoDB & JWT configs inside .env
npm start
```

### 3. Start AI API (Python)
*Open a new terminal window, navigate to the `Backend` folder:*
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

### 4. Run the App
Open the `Frontend/Public/login.html` file directly in your web browser. Ensure both the Node Server (5000) and Python Server (8000) are running smoothly in the background.
