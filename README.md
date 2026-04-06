# 🤖 AI Avatar with Voice Control

An interactive **3D AI-powered avatar** that responds to text and voice commands, performs animations, and explains its actions using AI.

---

## 🚀 Features

* 🎤 **Voice Control** (Web Speech API)
* 💬 Text command input
* 🧠 AI-powered explanations (Cohere API)
* 🎬 Real-time animation system (walk, run, wave, point, clap)
* 🎮 3D avatar rendered with Three.js
* ⚡ Fast backend using Flask

---

## 🧩 Tech Stack

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

## 📂 Project Structure

```
project-root/
│
├── src
│   
│   │   ├── App.jsx
│   │   ├── Avatar.jsx
        ├── backend/
│               ├── app.py
│               ├── .env
│               └── ...
│   │  
│   └── package.json
│
├── 
│
├── public/
│   ├── models/
│   │   └── avatar.glb
│   └── animations/
│       ├── idle.glb
│       ├── walking.glb
│       ├── run.glb
│       ├── pointing.glb
│       ├── waving.glb
│       └── clapping.glb
│
└── README.md
```

---




---

## 🔧 Backend Setup (Flask)

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
http://127.0.0.1:8000
```

---

## 💻 Frontend Setup (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🎮 Usage

### Text Commands

Type and press Enter:

* `walk forward`
* `run fast`
* `wave hello`
* `point there`
* `clap`

---

### 🎤 Voice Commands

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

## 🔁 How It Works

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

## ⚠️ Notes

* Voice works best in **Chrome / Edge**
* Requires:

  * `localhost` OR `https`
* Ensure backend is running before frontend

---

## 🔐 Security

Make sure `.env` is ignored:

```
.env
node_modules/
__pycache__/
```

---

## 🚀 Future Improvements

* 🗣️ Text-to-Speech (avatar talks back)
* 🎭 Emotion-based animations
* 🎧 Continuous listening mode (like Alexa)
* 👥 Multi-avatar interaction

---

## 👨‍💻 Author

Built by **Vhugala Mafanywa**

---


