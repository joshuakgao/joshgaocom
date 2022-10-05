import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMousePosition } from "../../../hooks";

function MyDotObject() {
  const mousePosition = useMousePosition();
  const mesh = useRef<any>();

  useFrame(() => {
    let dY = (window.innerWidth / 2 - mousePosition.x) / 10000;
    let dX = (window.innerHeight / 2 - mousePosition.y) / 10000;
    mesh.current.rotation.x += dX;
    mesh.current.rotation.y += dY;
  });

  return (
    <mesh ref={mesh} scale={3}>
      <dodecahedronBufferGeometry attach="geometry" />
      <meshStandardMaterial color="transparent" wireframe />
    </mesh>
  );
}

export function DotObject() {
  return (
    <div style={styles.object}>
      <Canvas camera={{ fov: 100, near: 0.1, far: 1000 }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.8} position={[300, 300, 400]} />
        <MyDotObject />
      </Canvas>
    </div>
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  object: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
  },
};
