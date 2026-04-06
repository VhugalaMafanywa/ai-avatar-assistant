import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Avatar = ({ currentAnimation = "idle" }) => {
  const group = useRef();

  const { scene } = useGLTF("/models/avatar.glb");

  // Load animations
  const idleGLB = useGLTF("/animations/idle.glb");
  const walkGLB = useGLTF("/animations/walking.glb");
  const pointGLB = useGLTF("/animations/pointing.glb");
  const waveGLB = useGLTF("/animations/waving.glb");
  const clapGLB = useGLTF("/animations/clapping.glb");
  const runGLB = useGLTF("/animations/run.glb");

  const clips = useMemo(() => {
    const allClips = [];
    const addClip = (glb, name) => {
      if (glb?.animations?.[0]) {
        const clip = glb.animations[0].clone();
        clip.name = name;
        allClips.push(clip);
      }
    };

    addClip(idleGLB, "idle");
    addClip(walkGLB, "walk");
    addClip(pointGLB, "pointing");
    addClip(waveGLB, "wave");
    addClip(clapGLB, "clapping");
    addClip(runGLB, "run");

    return allClips;
  }, [idleGLB, walkGLB, pointGLB, waveGLB, clapGLB, runGLB]);

  const { actions, mixer } = useAnimations(clips, group);

  // Position & Scale
  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    scene.position.set(-center.x, -center.y + size.y * 0.5, -center.z);
    const scale = 2.4 / size.y;           // Bigger = more visible motion
    scene.scale.set(scale, scale, scale);

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  // 🔥 STRONG ANIMATION PLAY
  useEffect(() => {
    if (!actions) return;

    // Stop everything
    Object.values(actions).forEach((a) => a?.stop());

    const action = actions[currentAnimation] || actions.idle;

    if (action) {
      action.reset()
            .setEffectiveWeight(1.0)      // Full control
            .setEffectiveTimeScale(1.0)
            .fadeIn(0.2)
            .play();

      console.log(`🎬 Playing: ${currentAnimation} (Weight: 1.0)`);
    }
  }, [currentAnimation, actions]);

  useFrame((_, delta) => mixer?.update(delta));

  return <primitive ref={group} object={scene} dispose={null} />;
};

// Preload only the main model to reduce memory pressure
useGLTF.preload("/models/avatar.glb");

export default Avatar;