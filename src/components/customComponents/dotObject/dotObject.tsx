import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useMousePosition } from "../../../hooks";
import ellipseImage from "../../../assets/3d_objects/textures/ellipse.png";

function MyDotObject() {
  const [oldMousePosition, setOldMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);
  const [inertia, setInertia] = useState({ iX: 0, iY: 0 });
  const mousePosition = useMousePosition();
  const objRef = useRef<any>();

  useFrame(() => {
    // every about 5 seconds rotate dot object
    let tick = time % 500;
    if (tick > 50 && tick < 150) {
      /*
          // used to accelerate then decelerate dot object

          f(tick) = -1 * abs(tick - 50) + 50
      */
      objRef.current.rotation.x += (-1 * Math.abs(tick - 75) + 75) / 2000;
      objRef.current.rotation.y += (-1 * Math.abs(tick - 75) + 75) / 2000;
    }
    setTime(time + 1);

    // rotate object along with mouse movement
    let dY = mousePosition.x - oldMousePosition.x;
    let dX = mousePosition.y - oldMousePosition.y;

    // if mouse stopped moving but had movement before, apply inertia
    if (dX === 0 && dY === 0) {
      objRef.current.rotation.x -= inertia.iX / 1000;
      objRef.current.rotation.y -= inertia.iY / 1000;

      // set inertia in a way that decelerates as frames continue.
      //I do this by subracting out specific fraction of the reminder inertia until it drops below 0.00001 (because it will never go to actual 0)
      setInertia({
        iX:
          inertia.iX < 0.00001 && inertia.iX > -0.00001
            ? 0
            : inertia.iX - inertia.iX / 5,
        iY:
          inertia.iY < 0.00001 && inertia.iY > -0.00001
            ? 0
            : inertia.iY - inertia.iY / 5,
      });
    }

    // if mouse moves again, reset inertia
    if (dX > 0.00001 || (dX < -0.00001 && dY > 0.00001) || dY < -0.00001) {
      setInertia({ iX: dX, iY: dY });
    }
    setOldMousePosition(mousePosition);
    objRef.current.rotation.x -= dX / 2000;
    objRef.current.rotation.y -= dY / 2000;
  });

  const dotTexture = useLoader(THREE.TextureLoader, ellipseImage);
  return (
    <points ref={objRef} scale={2.15}>
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

export function DotObject({ className }: { className?: string }) {
  return (
    <div style={styles.objectContainer} className={className}>
      <div style={styles.object}>
        <Suspense fallback={<div>...loading</div>}>
          <Canvas camera={{ fov: 100, near: 0.1, far: 1000 }}>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            <MyDotObject />
          </Canvas>
        </Suspense>
      </div>
    </div>
  );
}

type StyleSheet = {
  [key: string]: React.CSSProperties;
};

const styles: StyleSheet = {
  objectContainer: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
  },
  object: {
    position: "absolute",
    margin: "auto",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: "75vw",
    height: "75vh",
    maxWidth: 1024,
    maxHeight: 1024,
  },
};
