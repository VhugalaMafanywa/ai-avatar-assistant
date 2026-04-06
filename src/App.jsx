import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState } from "react";
import Avatar from "./Avatar";

export default function App() {
  const [animation, setAnimation] = useState("idle");
  const [explanation, setExplanation] = useState("");

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

  return (
    <div style={styles.container}>
      {/* LEFT PANEL - User Input */}
      <div style={styles.sidePanel}>
        
        
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
      </div>

      {/* CENTER - 3D Avatar */}
      <div style={styles.canvasContainer}>
        <Canvas 
          camera={{ position: [0, 1.6, 5.5], fov: 45 }}
          style={{ background: "transparent" }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={1.8} />
          <pointLight position={[-5, 3, -5]} intensity={0.6} color="#a5b4fc" />

          <Avatar currentAnimation={animation} />

          <OrbitControls 
            target={[0, 0.9, 0]} 
            enablePan={false}
            minDistance={2}
            maxDistance={8}
          />
        </Canvas>
      </div>

      {/* RIGHT PANEL - AI Response */}
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
    height: "100vh",
    width: "100%",
    background: "#0f172a",
    color: "#e2e8f0",
    overflow: "hidden",
  },

  sidePanel: {
    width: "280px",
    padding: "32px 24px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    background: "#111827",
    borderRight: "1px solid rgba(148, 163, 184, 0.1)",
  },

  panelTitle: {
    margin: "0 0 8px 0",
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#c4d0ff",
    letterSpacing: "0.5px",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    background: "#1e2937",
    color: "white",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s",
  },

  button: {
    padding: "14px 24px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(90deg, #6366f1, #a855f7)",
    color: "white",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
  },

  canvasContainer: {
    flex: 1,
    position: "relative",
    background: "radial-gradient(circle at center, #1e2937 0%, #0f172a 70%)",
  },

  output: {
    padding: "20px",
    borderRadius: "12px",
    background: "#1e2937",
    minHeight: "180px",
    lineHeight: "1.6",
    border: "1px solid rgba(148, 163, 184, 0.1)",
    whiteSpace: "pre-wrap",
  },
};