type InstructionProps = {
  isHovered: boolean;
};

const Instruction = ({ isHovered }: InstructionProps) => {
  return (
    <>
      {isHovered && (
        <div className="absolute top-2 left-0 bg-amber-50/50 text-sm p-4 min-w-max">
          <p>
            <strong>W, A, S, D</strong> - to move the player
          </p>
          <p>
            <strong>Spacebar</strong> - to jump
          </p>
          <p>
            <strong>1, 2, 3, 4, 5</strong> - to select a block
          </p>
          <p>
            <strong>Left click</strong> - to put a block
          </p>
        </div>
      )}
    </>
  );
};

export default Instruction;
