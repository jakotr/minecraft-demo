//store
import useStore from "../hooks/useStore";

const Menu = () => {
  const [saveWorld, resetWorld] = useStore((state) => [
    state.saveWorld,
    state.resetWorld,
  ]);

  return (
    <div className="absolute top-3 left-3 flex flex-col gap-3">
      <button
        className="px-2 py-1 bg-stone-50 text-zinc-900 text-sm shadow-lg rounded"
        onClick={() => saveWorld()}
      >
        Save World
      </button>
      <button
        className="px-2 py-1 bg-stone-50 text-zinc-900 text-sm shadow-lg rounded"
        onClick={() => resetWorld()}
      >
        Reset World
      </button>
    </div>
  );
};

export default Menu;
