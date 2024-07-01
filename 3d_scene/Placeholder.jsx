export default function Placeholder({ scale, positionY, boxGeometryArgs }) {
  return (
    <mesh position-y={positionY} scale={scale}>
      <boxGeometry args={boxGeometryArgs} />
      <meshBasicMaterial wireframe color="red" />
    </mesh>
  );
}
