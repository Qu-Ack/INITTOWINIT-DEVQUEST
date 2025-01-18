import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from data import dataset

# Function to process data and prepare features
def process_data(data, for_prediction=False):
    tone_map = {"light": 0, "medium": 1, "dark": 2}
    texture_map = {"smooth": 0, "normal": 1, "dry": 2, "oily": 3, "rough": 1}
    dark_circles_map = {"absent": 0, "present": 1, "no": 0}
    
    features = []
    labels = []
    outputs_map = {}

    for entry in data:
        skin_analysis = entry["skin_analysis"]
        nail_analysis = entry["nail_analysis"]

        tone = tone_map.get(skin_analysis["tone"], 0)
        texture = texture_map.get(skin_analysis["texture"], 1)
        dark_circles = dark_circles_map.get(skin_analysis["dark_circles"], 0)
        spot_count = len(skin_analysis.get("spots", []))
        avg_spot_size = np.mean([spot["size"] for spot in skin_analysis.get("spots", [])]) if spot_count > 0 else 0

        nail_color = nail_analysis.get("color", {}).get("RGB", [0, 0, 0])
        edge_intensity = nail_analysis.get("texture", {}).get("edge_intensity", 0)
        shapes_detected = nail_analysis.get("shape", {}).get("shapes_detected", [])
        round_shape = 1 if "Round" in shapes_detected else 0
        irregular_shape = 1 if "Irregular" in shapes_detected else 0

        feature = [
            tone, texture, dark_circles, spot_count, avg_spot_size,
            nail_color[0], nail_color[1], nail_color[2], edge_intensity,
            round_shape, irregular_shape
        ]
        features.append(feature)

        if not for_prediction:
            outputs = entry["outputs"]
            labels.append(outputs["disease"])
            outputs_map[outputs["disease"]] = outputs

    if for_prediction:
        return pd.DataFrame(features, columns=[
            'tone', 'texture', 'dark_circles', 'spot_count', 'avg_spot_size',
            'color_R', 'color_G', 'color_B', 'edge_intensity',
            'round_shape', 'irregular_shape'
        ]), None, None

    return pd.DataFrame(features, columns=[
        'tone', 'texture', 'dark_circles', 'spot_count', 'avg_spot_size',
        'color_R', 'color_G', 'color_B', 'edge_intensity',
        'round_shape', 'irregular_shape'
    ]), labels, outputs_map

# Prepare dataset
X, y, outputs_map = process_data(dataset)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Train Random Forest model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Display model accuracy
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy:.2f}")
