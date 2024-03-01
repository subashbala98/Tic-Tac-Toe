import React, { MouseEventHandler } from "react";
type Props = {
  value: string;
  handleClick: MouseEventHandler<HTMLButtonElement>;
};
const Square: React.FC<Props> = ({ value, handleClick }) => {
  return (
    <button
      className=" border-green-700 border-2 py-2 min-h-16 text-white"
      onClick={handleClick}
    >
      {value}
    </button>
  );
};

export default Square;
