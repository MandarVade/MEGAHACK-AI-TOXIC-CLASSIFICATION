from fastapi import FastAPI
from pydantic import BaseModel
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Try loading the Tfidf and model
try:
    tfidf = pickle.load(open("tf_idf.pkt", "rb"))
    nb_model = pickle.load(open("toxicity_model.pkt", "rb"))
except Exception as e:
    print("Error loading model:", e)
    tfidf = None
    nb_model = None

# Define input model
class CommentInput(BaseModel):
    text: str

# Define API endpoint
@app.post("/predict")
async def predict(input_data: CommentInput):
    if not tfidf or not nb_model:
        return {"error": "Model not loaded properly. Please check your model files."}

    # Transform the input to Tfidf vectors
    text_tfidf = tfidf.transform([input_data.text]).toarray()
    
    # Predict the class of the input text
    prediction = nb_model.predict(text_tfidf)
    
    # Map the predicted class to a string
    class_name = "Toxic" if prediction[0] == 1 else "Non-Toxic"
    
    # Return the prediction in a JSON response
    return {
        "text": input_data.text,
        "class": class_name
    }
