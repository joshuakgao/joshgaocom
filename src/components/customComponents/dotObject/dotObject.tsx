import React from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import pointCloud from "../../../assets/3d_objects/homepage_pointcloud.glb";

function MyDotObject() {
  const gltf = useLoader(GLTFLoader, pointCloud);
  return (
    <mesh scale={3}>
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
