from flask import Flask, request, jsonify
from openai import OpenAI
import os
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app, origin = "*")

# Set OpenAI API key
api_key = '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'  # Replace with your OpenAI API key

client = OpenAI(api_key=api_key)


# Define the route for moderation check
@app.route('/moderate', methods=['POST'])
def moderate_message():
    # Get the input message from the request
    input_message = request.json.get('message')

    # Check if the input message is provided
    if not input_message:
        return jsonify({"error": "No message provided"}), 400

    try:
        # Call OpenAI Moderation API to check the message
        response = client.moderations.create(
            model="omni-moderation-latest",
            input=input_message
        )

        # Extract the moderation result
        moderation_result = response.results[0]

        # Return the results in JSON format
        return jsonify({
            "flagged": moderation_result.flagged,
            "categories": moderation_result.categories.__dict__,
            "categories_score":moderation_result.category_scores.__dict__
        })

    except Exception as e:
        # Return error if something goes wrong
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Start the Flask app
    app.run(debug=True, host='0.0.0.0', port=8000)