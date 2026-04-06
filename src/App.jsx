import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useRef } from "react";
import Avatar from "./Avatar";

export default function App() {
  const [animation, setAnimation] = useState("idle");
  const [explanation, setExplanation] = useState("");
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  const handleCommand = async (text) => {
    if (!text?.trim()) return;

    setExplanation("Thinking...");

    try {
      const res = await fetch("http://127.0.0.1:8000/command", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();

      setAnimation(data.animation || "idle");
      setExplanation(data.explanation || "No response");
    } catch (err) {
      console.error(err);
      setExplanation("Backend error. Please try again.");
    }
  };

  const toggleListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition not supported in this browser");
      return;
    }

    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setListening(true);
      recognition.onend = () => setListening(false);

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        handleCommand(text);
      };

      recognitionRef.current = recognition;
    }

    if (listening) recognitionRef.current.stop();
    else recognitionRef.current.start();
  };

  return (
    <div style={styles.container}>
      {/* LEFT PANEL */}
      <div style={styles.sidePanel}>
        <h2 style={styles.panelTitle}>Command Input</h2>

        <input
          style={styles.input}
          type="text"
          placeholder="Type command..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCommand(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />

        <button
          style={styles.button}
          onClick={() => {
            const input = document.querySelector("input");
            if (input) {
              handleCommand(input.value);
              input.value = "";
            }
          }}
        >
          Send
        </button>

        <button
          style={{
            ...styles.micButton,
            background: listening
              ? "linear-gradient(135deg, #ef4444, #f43f5e)"
              : styles.micButton.background,
            transform: listening ? "scale(1.1)" : "scale(1)",
          }}
          onClick={toggleListening}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10v2a7 7 0 0 0 14 0v-2" />
            <line x1="12" y1="22" x2="12" y2="18" />
          </svg>
        </button>
      </div>

      {/* CENTER - AVATAR */}
      <div style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 1.6, 5.5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <pointLight position={[-5, 3, -5]} intensity={0.6} />

          <Avatar currentAnimation={animation} />

          <OrbitControls
            target={[0, 0.9, 0]}
            enablePan={false}
            minDistance={2}
            maxDistance={8}
          />
        </Canvas>
      </div>

      {/* RIGHT PANEL */}
      <div style={styles.sidePanel}>
        <h2 style={styles.panelTitle}>AI Response</h2>

        <div style={styles.output}>
          {explanation || "Your AI response will appear here..."}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    height: "100vh",
    width: "100%",
    background: "#0f172a",
    color: "#e2e8f0",
    overflow: "hidden",
  },

  sidePanel: {
    flex: "0 0 280px",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background: "#111827",
    borderRight: "1px solid rgba(148, 163, 184, 0.1)",
  },

  panelTitle: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#c4d0ff",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "#1e2937",
    color: "white",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#6366f1",
    color: "white",
    cursor: "pointer",
  },

  micButton: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    border: "none",
    background: "linear-gradient(135deg, #6366f1, #a855f7)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
    transition: "all 0.2s ease",
  },

  canvasContainer: {
    flex: 1,
    position: "relative",
    minWidth: 0,
    background: "radial-gradient(circle, #1e2937, #0f172a)",
  },

  output: {
    padding: "20px",
    borderRadius: "10px",
    background: "#1e2937",
    minHeight: "180px",
    overflowY: "auto",
    wordWrap: "break-word",
  },

  "@media (max-width: 900px)": {
    container: { flexDirection: "column" },
    sidePanel: { width: "100%", flex: "none", borderRight: "none", borderBottom: "1px solid rgba(148,163,184,0.1)" },
    canvasContainer: { width: "100%", height: "50vh" },
  },

  "@media (max-width: 500px)": {
    canvasContainer: { height: "40vh" },
    sidePanel: { padding: "16px" },
  },
};
