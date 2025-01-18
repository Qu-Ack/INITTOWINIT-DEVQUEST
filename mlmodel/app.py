from flask import Flask, request, jsonify
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pandas as pd
import numpy as np
from model_script import process_data  # Import process_data from your main script

# Load the trained Random Forest model and LabelEncoder (removed joblib)
model = None
label_decoder = None
outputs_map = None

# Initialize Flask app
app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        input_data = request.get_json()

        if not input_data:
            return jsonify({"error": "No input data provided"}), 400

        # Process input data to extract features
        input_features, _, _ = process_data([input_data], for_prediction=True)

        # Make prediction using the model
        predicted_label = model.predict(input_features)
        predicted_disease = label_decoder.inverse_transform(predicted_label)[0]

        # Fetch detailed output for the predicted disease
        predicted_output = outputs_map.get(predicted_disease, {})

        # Prepare JSON response
        response = {
            "predicted_disease": predicted_disease,
            "report": predicted_output
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Initialize the model, label encoder, and outputs map
    from data import dataset  # Import dataset from your data source

    # Prepare dataset
    X, y, outputs_map = process_data(dataset)
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # Train Random Forest model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X, y_encoded)

    # Assign global variables
    label_decoder = label_encoder

    app.run(debug=True)
