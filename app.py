from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS
app = Flask(__name__)      
CORS(app)                  

MODEL_NAME = "cardiffnlp/twitter-roberta-base-offensive"
nlp = pipeline("text-classification", model=MODEL_NAME, return_all_scores=True)

labels = ["not_offensive", "offensive", "targeted_offensive"]

INSULT_WORDS = ["stupid", "idiot", "dumb", "fool", "moron"]
THREAT_WORDS = ["kill", "attack", "murder", "destroy", "shoot"]

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json(force=True)
    text = data.get("text", "")

    preds = nlp(text)[0]
    results = {labels[i]: float(preds[i]["score"]) for i in range(len(preds))}
    best_label = max(results, key=results.get)
    final_label = best_label
    final_score = results[best_label]

    
    lowered = text.lower()
    if any(word in lowered for word in THREAT_WORDS):
        final_label = "targeted_offensive"
        final_score = 0.99
    elif any(word in lowered for word in INSULT_WORDS):
        final_label = "offensive"
        final_score = 0.95

    return jsonify({
        "scores": results,
        "final_label": final_label,
        "final_score": final_score
    })

if __name__ == "__main__":
    app.run(debug=True)
