import { Mesh } from "three";
import { usePlane } from "@react-three/cannon";
import { NearestFilter, RepeatWrapping } from "three";

//store
import useStore from "../hooks/useStore";

//textures / images
import { groundTexture } from "../assets/images/textures";

const Ground = () => {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0], //-Math.PI / 2 => -90deg
    position: [0, -0.5, 0],
  }));

  const [addCube] = useStore((state) => [state.addCube]);

  groundTexture.magFilter = NearestFilter;
  groundTexture.wrapS = RepeatWrapping;
  groundTexture.wrapT = RepeatWrapping;
  groundTexture.repeat.set(100, 100);

  return (
    <mesh
      ref={ref}
      onClick={(e) => {
        e.stopPropagation;
        const [x, y, z] = Object.values(e.point).map((v) => Math.ceil(v));
        addCube(x, y, z);
      }}
    >
      <planeGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial attach="material" map={groundTexture} />
    </mesh>
  );
};

export default Ground;
