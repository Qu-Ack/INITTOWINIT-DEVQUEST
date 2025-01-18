import os
import google.generativeai as genai
from flask import Flask, request, jsonify

app = Flask(__name__)

# Configure Google Generative AI with the API key
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

model = genai.GenerativeModel(
  model_name="gemini-2.0-flash-exp",
  generation_config=generation_config,
)

history = []

@app.route('/chat', methods=['POST'])
def chat():
    # Get user input from the POST request
    data = request.get_json()
    user_input = data.get("message")

    if not user_input:
        return jsonify({"error": "No message provided"}), 400
    
    # Start a new chat session
    chat_session = model.start_chat(history=history)
    
    # Send the user input message to the model
    response = chat_session.send_message(user_input)
    
    model_response = response.text
    
    # Store user and model messages in history
    history.append({"role": "user", "parts": [user_input]})
    history.append({"role": "model", "parts": [model_response]})
    
    return jsonify({"response": model_response})

if __name__ == '__main__':
    app.run(debug=True)
