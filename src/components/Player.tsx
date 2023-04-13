import { useFrame, useThree } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3, Mesh } from "three";

//hooks
import useKeyboard from "../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  //customowy hook do obsługi klawiatury
  const { moveBackward, moveForward, moveLeft, moveRight, jump } =
    useKeyboard();

  //kamera
  const { camera } = useThree();

  //kolo - obiekt player
  const [ref, api] = useSphere<Mesh>(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 2, 0],
  }));

  //referencja do pozycji
  const position = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => (position.current = p));
  }, [api.position]);

  //referencja do velocity
  const velocity = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((p) => (velocity.current = p));
  }, [api.velocity]);

  //funcka wywołująca się z każdym framem
  useFrame(() => {
    const [xPos, yPos, zPos] = position.current;

    //ustaw kamere do referencji pozycji
    camera.position.copy(new Vector3(xPos, yPos, zPos));

    const [xVel, yVel, zVel] = velocity.current;

    //Wektor sumujący pozycję wektora frontowego i sideowego
    const direction = new Vector3();

    //Wektor do prouszania się przód tył
    const frontVector = new Vector3(
      0,
      0,
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );

    //Wektor do prouszania się w lewo i prawo
    const sideVector = new Vector3(
      (moveLeft ? 1 : 0) - (moveRight ? 1 : 0),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, yVel, direction.z);

    //skok
    //TODO bug ze skokiem
    if (jump && Math.abs(+(yVel < 0.05))) {
      api.velocity.set(xVel, JUMP_FORCE, zVel);
    }
  });

  return <mesh ref={ref}></mesh>;
};

export default Player;
