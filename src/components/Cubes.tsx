//components
import Cube from "./Cube"

//store
import useStore from "../hooks/useStore"

//render all the cubes
const Cubes = () => {

  const [cubes] = useStore((state) => [
    state.cubes
  ])

  console.log(cubes)

  return cubes.map(({key, position, texture }) => (

    <Cube key={key} position={position} texture={texture} />

  ))
}

export default Cubes