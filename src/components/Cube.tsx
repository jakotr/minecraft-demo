import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh } from "three";

//cube textures
import * as textures from "../assets/images/textures";

//store
import useStore from "../hooks/useStore";

type CubeProps = {
  position: [x: number, y: number, z: number];
  texture: string;
};

const Cube = ({ position, texture }: CubeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox<Mesh>(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const handleCubeFace = (face: number, e: ThreeEvent<MouseEvent>) => {
    const { x, y, z } =
      ref.current !== null ? ref.current.position : { x: 0, y: 0, z: 0 };

    if (e.altKey) {
      removeCube(x, y, z);
    } else {
      switch (face) {
        case 0:
          addCube(x + 1, y, z);
          break;
        case 1:
          addCube(x - 1, y, z);
          break;
        case 2:
          addCube(x, y + 1, z);
          break;
        case 3:
          addCube(x, y - 1, z);
          break;
        case 4:
          addCube(x, y, z + 1);
          break;
        case 5:
          addCube(x, y, z - 1);
          break;
        default:
          return null;
      }
    }
  };

  const activeTexture =
    textures[(texture + "Texture") as keyof typeof textures];

  return (
    <mesh
      onPointerMove={(e) => {
        e.stopPropagation();
        setIsHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setIsHovered(false);
      }}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        if (e.faceIndex) {
          const clickedFace = Math.floor(e.faceIndex / 2);
          handleCubeFace(clickedFace, e);
        }
      }}
    >
      <boxGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        attach="material"
        color={isHovered ? "grey" : "white"}
        transparent={true}
        opacity={texture === "glass" ? 0.7 : 1}
      />
    </mesh>
  );
};

export default Cube;
