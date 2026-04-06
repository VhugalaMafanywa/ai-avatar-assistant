import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar from "./Avatar";

export default function Scene({ animation }) {
  return (
    <Canvas camera={{ position: [0, 1.5, 3] }}>
      <ambientLight intensity={1} />
      <OrbitControls />
      <Avatar animation={animation} />
    </Canvas>
  );
}
