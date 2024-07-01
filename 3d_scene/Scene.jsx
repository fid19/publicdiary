"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";

export default function Scene() {
  return (
    <Canvas
      shadows={false}
      className="r3f"
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [0, 0, 5],
      }}
    >
      {/* <color args={["#525F43"]} attach="background" /> */}
      <Experience />
    </Canvas>
  );
}
