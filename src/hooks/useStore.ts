import { create } from "zustand";
import { nanoid } from "nanoid";

interface Cube {
  key: string;
  position: [x: number, y: number, z: number];
  texture: string;
}

interface MCStore {
  texture: string;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
}

const getLocalStorage = (key: string) =>
  JSON.parse(window.localStorage.getItem(key) || "");
const setLocalStorage = (key: string, value: Cube[]) =>
  window.localStorage.setItem(key, JSON.stringify(value));

const useStore = create<MCStore>()((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          position: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.position;
        return x !== X || y !== Y || z !== Z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));

export default useStore;
