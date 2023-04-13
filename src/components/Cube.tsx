import { useState } from "react";
import { useBox } from "@react-three/cannon";
import { NearestFilter } from "three";

//cube extures
import * as textures from "../assets/images/textures";

//store 
import useStore from "../hooks/useStore";

const Cube = ({ position, texture }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [ref] = useBox(() => ({
    type: "Static",
    position,
  }));

  const [addCube, removeCube] = useStore((state) => [
    state.addCube,
    state.removeCube,
  ]);

  const handleCubeFace = (face, e) => {
    const { x, y, z } = ref.current.position;
    if (e.altKey) {
      console.log("alllt");
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

  const activeTexture = textures[texture + "Texture"];
  //poprawa filtra tekstury (by była pikseloaza)

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
        const clickedFace = Math.floor(e.faceIndex / 2);
        console.log(clickedFace);
        handleCubeFace(clickedFace, e);
      }}
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial
        map={activeTexture}
        attach="material"
        color={isHovered ? "grey" : "white"}
        transparent = {true}
        opacity={texture === 'glass' ? .7 : 1}
      />
    </mesh>
  );
};

export default Cube;
