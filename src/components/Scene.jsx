import { OrbitControls } from '@react-three/drei';
import Avatar from './Avatar';

export default function Scene({ currentAction }) {
  return (
    <>
      {/* Strong lighting so the yellow robot is clearly visible */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 15, 10]}
        intensity={1.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-10, 10, -10]} intensity={0.6} />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI * 0.5, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* The Avatar Component */}
      <Avatar currentAction={currentAction} />

      {/* Camera Controls */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        target={[0, 1.8, 0]}     // Look at the robot's chest level
      />
    </>
  );
}