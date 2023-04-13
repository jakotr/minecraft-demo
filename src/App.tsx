import { Canvas } from "@react-three/fiber"
import { Sky } from "@react-three/drei"
import {Physics} from '@react-three/cannon'

//components
import FPV from "./components/FPV"
import Ground from "./components/Ground"
import Player from "./components/Player"
import Cubes from "./components/Cubes"
import TextureSelector from "./components/TextureSelector"
import Menu from "./components/Menu"

function App() {

  return (
    <>
      <Canvas>
        <Sky sunPosition={[100, 100, 20]} />
        <ambientLight intensity={0.5} />
        <FPV />
        <Physics>
          <Ground />
          <Cubes />
          <Player />
        </Physics>
      </Canvas>
      <div className="absolute text-stone-50 text-4xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">+</div>
      <TextureSelector />
      <Menu />
    </>
  )
}

export default App
