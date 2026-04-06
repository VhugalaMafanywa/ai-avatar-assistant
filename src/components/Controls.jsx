import { useState } from "react";

export default function Controls({ onSend }) {
  const [text, setText] = useState("");

  return (
    <div style={{ position: "absolute", top: 20, left: 20 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type command..."
      />
      <button onClick={() => onSend(text)}>Run</button>
    </div>
  );
}
