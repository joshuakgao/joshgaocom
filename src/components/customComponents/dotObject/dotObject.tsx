import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMousePosition } from "../../../hooks";
import ellipseImage from "../../../assets/3d_objects/textures/ellipse.png";

function MyDotObject() {
  const [oldMousePosition, setOldMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const mousePosition = useMousePosition();
  const objRef = useRef<any>();

  useFrame(() => {
    // every about 5 seconds rotate dot object
    let tick = time % 500;
    if (tick > 0 && tick % 500 < 100) {
      /*
          // used to accelerate then decelerate dot object

          f(tick) = -1 * abs(tick - 50) + 50 
      */
      objRef.current.rotation.x += (-1 * Math.abs(tick - 50) + 50) / 1000;
      objRef.current.rotation.y += (-1 * Math.abs(tick - 50) + 50) / 1000;
    }
    setTime(time + 1);

    // rotate object along with mouse movement
    let dY = mousePosition.x - oldMousePosition.x;
    let dX = mousePosition.y - oldMousePosition.y;

    if (dX === 0 && dY === 0) return; // don't rotate if mouse position didn't change

    setOldMousePosition(mousePosition);
    objRef.current.rotation.x -= dX / 2000;
    objRef.current.rotation.y -= dY / 2000;
  });

  const dotTexture = useLoader(THREE.TextureLoader, ellipseImage);
  return (
    <points ref={objRef} scale={2.5}>
      <sphereBufferGeometry attach="geometry" />
      <pointsMaterial
        attach="material"
        map={dotTexture}
        size={0.07}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={0.6}
      />
    </points>
  );
}

export function DotObject() {
  return (
    <div style={styles.object}>
      <Suspense fallback={<div>...loading</div>}>
        <Canvas camera={{ fov: 100, near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.5} />
          <spotLight intensity={0.8} position={[300, 300, 400]} />
          <MyDotObject />
        </Canvas>
      </Suspense>
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
