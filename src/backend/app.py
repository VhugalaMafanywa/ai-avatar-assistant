from flask import Flask, request, jsonify
import cohere
from dotenv import load_dotenv
import os
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)


CORS(app,
     resources={r"/*": {"origins": "*"}},
     supports_credentials=True)


# ====================== Cohere ======================
COHERE_API_KEY = os.getenv("COHERE_API_KEY")

if not COHERE_API_KEY:
    raise ValueError("❌ COHERE_API_KEY is missing! Check your .env file.")

co = cohere.ClientV2(api_key=COHERE_API_KEY)

# Animation mapping
animation_map = {
    "stand": "idle", "idle": "idle",
    "walk": "walk", "running": "run", "run": "run",
    "wave": "wave", "hello": "wave", "hi": "wave",
    "point": "pointing", "pointing": "pointing",
    "clap": "clapping", "clapping": "clapping",
}

@app.route("/command", methods=["POST", "OPTIONS"])
def handle_command():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        return jsonify({}), 200

    try:
        data = request.get_json()
        user_message = data.get("message", "").strip()

        if not user_message:
            return jsonify({"animation": "idle", "explanation": "Please type a command."})

        user_lower = user_message.lower()
        animation = "idle"
        for key, anim in animation_map.items():
            if key in user_lower:
                animation = anim
                break

        # Get explanation from Cohere
        prompt = f'User said: "{user_message}". The avatar is performing a "{animation}" action. Write a short, friendly, natural explanation (1-2 sentences).'

        response = co.chat(
            model="command-a-03-2025",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
            max_tokens=120
        )

        explanation = response.message.content[0].text.strip()

        return jsonify({
            "animation": animation,
            "explanation": explanation
        })

    except Exception as e:
        print("Backend Error:", str(e))
        return jsonify({
            "animation": "idle",
            "explanation": "The avatar is performing the action."
        }), 500


if __name__ == "__main__":
    print("🚀 Flask server running on http://127.0.0.1:8000")
    app.run(debug=True, port=8000)
