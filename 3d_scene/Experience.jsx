import { useRef } from "react";
import Notebook from "./Notebook.jsx";
import * as THREE from "three";
import { Environment, Lightformer, useHelper } from "@react-three/drei";

export default function Experience() {
  // useFrame((state, delta) => {
  //   const time = state.clock.elapsedTime;
  //   cubeRef.current.position.x = 2 + Math.sin(time);
  // });
  const directionalLight = useRef();
  // const cubeRef = useRef();

  useHelper(directionalLight, THREE.DirectionalLightHelper, 1);

  return (
    <>
      {/* <BakeShadows /> */}
      {/* <SoftShadows size={5} samples={30} focus={5} /> */}
      {/* <ambientLight intensity={0.5} color="#798A65" /> */}
      <Notebook />
      {/* <OrbitControls makeDefault /> */}
      <Environment>
        <color args={["black"]} attach="background" />
        <Lightformer
          position-z={-5}
          scale={30}
          color="#525f43"
          intensity={100}
          form="rect"
        />
        <mesh position-z={-1} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color="#798A65" />
        </mesh>{" "}
        */
      </Environment>
      ;{/* <Sky sunPosition={[1, -0.1, 3]} /> */}
      {/* <ContactShadows
        position={[0, -1.5, 0]}
        scale={15}
        resolution={512}
        far={15}
        blur={1.4}
        opacity={0.5}
      /> */}
      {/* <directionalLight
        ref={directionalLight}
        position={[1, 2, 3]}
        intensity={4.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
      /> */}
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        frames={Infinity}
        opacity={0.8}
        blend={100}
        temporal
      >
        <RandomizedLight
          amount={10}
          radius={1}
          ambient={0.5}
          intensity={3}
          bias={0.001}
          position={[1, 2, 3]}
        />
      </AccumulativeShadows> */}
      {/* <Suspense
        fallback={
          <Placeholder
            positionY={0.5}
            scale={[2, 3, 2]}
            boxGeometryArgs={[1, 1, 1, 2, 2, 2]}
          />
        }
      >
        <Notebook scale={0.03} position-x={3} />
      </Suspense> */}
      {/* <mesh rotation-x={-Math.PI * 0.5} position-y={-1} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh> */}
      {/* <mesh ref={cubeRef} castShadow>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh> */}
    </>
  );
}
