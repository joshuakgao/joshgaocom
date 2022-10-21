import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import React, { Suspense, useRef, useState } from "react";
import * as THREE from "three";
import dotImage from "../../../assets/3d_objects/textures/dot.png";
import { useMousePosition } from "../../../hooks";

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

  const dotTexture = useLoader(THREE.TextureLoader, dotImage);
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
    <div style={styles.object} className={className}>
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
