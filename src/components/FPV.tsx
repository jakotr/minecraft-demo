import { useThree } from "@react-three/fiber";
import { PointerLockControls } from "@react-three/drei";

const FPV = () => {

  const {camera, gl} = useThree()

  return <PointerLockControls args={[camera, gl.domElement]} />;
};

export default FPV;
