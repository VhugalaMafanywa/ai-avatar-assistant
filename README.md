# 🤖 AI Avatar with Voice Control

An interactive **3D AI-powered avatar** that responds to text and voice commands, performs animations, and explains its actions using AI.
- <img width="1121" height="594" alt="image" src="https://github.com/user-attachments/assets/0f23b40f-18a8-4b22-80c4-bffd7b7cf539" />


---

## 🚀 Features

* 🎤 **Voice Control** (Web Speech API)
* 💬 Text command input
* 🧠 AI-powered explanations (Cohere API)
* 🎬 Real-time animation system (walk, run, wave, point, clap)
* 🎮 3D avatar rendered with Three.js
* ⚡ Fast backend using Flask

---

##  Tech Stack

### Frontend

* React
* @react-three/fiber
* @react-three/drei
* Three.js

### Backend

* Flask (Python)
* Cohere API (AI reasoning)
* Flask-CORS

---



---

##  Backend Setup (Flask)

```bash
cd backend
pip install flask flask-cors python-dotenv cohere
```

Create a `.env` file:

```
COHERE_API_KEY=your_api_key_here
```

Run the server:

```bash
python app.py
```

Server runs on:

```
(https://ai-avatar-assistant.onrender.com)
```

---

##  Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
(https://ai-avatar-assistant-sepia.vercel.app/)
```

---

##  Usage

### Text Commands

Type and press Enter:

* `walk forward`
* `run fast`
* `wave hello`
* `point there`
* `clap`

---

###  Voice Commands

Click the **🎤 Speak** button and say:

* “walk forward”
* “run fast”
* “wave hello”

The avatar will:

1. Listen to your voice
2. Convert speech → text
3. Send to backend
4. Animate
5. Explain the action

---

##  How It Works

```
🎤 Voice / ⌨️ Text Input
        ↓
Frontend (React)
        ↓
Flask API (/command)
        ↓
Cohere AI (explanation)
        ↓
Animation response
        ↓
3D Avatar updates
```

---

##  Notes

* Voice works best in **Chrome / Edge**
* Requires:

  * `localhost` OR `https`
* Ensure backend is running before frontend

---

##  Security

Make sure `.env` is ignored:

```
.env
node_modules/
__pycache__/
```

---

##  APIs & Tools Used
- Cohere API – conversational AI
- Web Speech API – speech input
- Three.js – 3D avatar rendering
- GLB models – 3D avatar assets

---
##  Limitations
- Avatar actions are triggered but do not always mimic accurately
- Animation mapping from AI responses is basic
- No lip-syncing yet
- Latency in speech input processing and AI response

---
##  Next Steps
- Improve animation accuracy and synchronization
- Add lip-syncing and emotion mapping
- Implement real-time voice streaming
- Introduce memory/personalized AI responses

---


