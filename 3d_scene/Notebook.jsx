"use client";

// import { useLoader } from "@react-three/fiber";
import {
  Float,
  PresentationControls,
  Text,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Notebook() {
  const { nodes, materials } = useGLTF("/assets/notebook.glb");
  const val = useGLTF("/assets/notebook.glb");

  const group = useRef();

  // const { actions } = useAnimations(animations, group);

  // materials[""].color.r = 121;
  // materials[""].color.g = 138;
  // materials[""].color.b = 101;

  // useEffect(() => {
  //   const action = actions.Survey;
  //   action.reset().fadeIn(0.5).play();

  //   return () => {
  //     action.fadeOut(0.5);
  //   };
  // }, []);

  return (
    <PresentationControls
      rotation={[0.13, 0.1, 0]}
      polar={[-0.4, 0.2]}
      azimuth={[-1, 0.75]}
      config={{ mass: 2, tension: 400 }}
      snap={{ mass: 4, tension: 400 }}
    >
      <Float
        floatIntensity={8.4}
        rotationIntensity={8}
        floatingRange={[0.1, 0.2]}
        speed={0.5}
      >
        <group
          dispose={null}
          rotation-y={Math.PI * 1.2}
          rotation-x={-Math.PI * 0.1}
          scale={0.08}
          position-x={-1.5}
          position-y={-0.5}
          position-z={1}
        >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Asset3DLoadersceneRoot.geometry}
            material={nodes.Asset3DLoadersceneRoot.material}
          />
        </group>
        {/* <Text
          rotation-y={-Math.PI * 0.25}
          position={[-2, 0.75, 0.75]}
          fontSize={0.5}
        >
          Diary
        </Text> */}
      </Float>
    </PresentationControls>
  );
}

useGLTF.preload("/assets/Fox/gltf-Embedded/Fox.gltf");
