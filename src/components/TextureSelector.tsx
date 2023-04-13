import React, { useEffect, useState } from "react";
//keytboard handler
import useKeyboard from "../hooks/useKeyboard";
//store
import useStore from "../hooks/useStore";
import {
	dirtImg,
	grassImg,
	glassImg,
	woodImg,
	logImg,
} from '../assets/images/images'

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
}


const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [state.texture, state.setTexture]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  const textures = {
    dirt,
    grass,
    glass,
    wood,
    log
  }

  useEffect(() => {
    const pressedTexture = Object.entries(textures).find(([key, value]) => value)

    if(pressedTexture) {
      const [key, value] = pressedTexture
      setTexture(key)
    }

  }, [dirt, grass, glass, wood, log])

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    <>{visible && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[6] flex">
        {Object.entries(images).map(([key, image]) => {
          return <img src={image} key={key} className={`${key === activeTexture ? 'border border-black' : 'border border-transparent'}`} />
        })}
    </div>}</>
  );
};

export default TextureSelector;
