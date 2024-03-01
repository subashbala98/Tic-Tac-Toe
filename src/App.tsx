import { useEffect, useState } from "react";
import Square from "./components/Square";
import Confetti from "react-confetti";

const App = () => {
  const initialValue = Array(9).fill(null);
  const [square, setSquare] = useState(initialValue);
  const [next, setNext] = useState(true);
  const [blasting, setBlasting] = useState(false);
  const startBlasting = () => {
    setBlasting(true);
    setTimeout(() => {
      setBlasting(false);
      setSquare(initialValue);
    }, 5000); // Stop blasting after 3 seconds
  };
  const calculateWinner = (square: number[]) => {
    const list = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < list.length; i++) {
      const [a, b, c] = list[i];
      if (square[a] && square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  };
  const isWinner = calculateWinner(square);
  useEffect(() => {
    if (isWinner) {
      startBlasting();
    }
  }, [isWinner]);

  const handleClick = (idx: number) => {
    if (square[idx] || calculateWinner(square)) {
      return;
    }
    const getSquare = [...square];
    getSquare[idx] = next ? "X" : "O";
    setNext(!next);
    setSquare(getSquare);
  };
  const restart = square.every((item) => item === null);
  return (
    <>
      {blasting && <Confetti />}
      <section className="text-center mt-16 text-3xl font-mono font-bold">
        {isWinner ? (
          <h1 className="mb-4 text-7xl text-green-600 italic">You won 🏆</h1>
        ) : null}
        <h1 className="text-4xl my-4 text-green-700 italic">Tic-Tac-Toe</h1>
        <div className="w-96 grid grid-cols-3 mx-auto my-0 bg-green-400">
          {square.map((value, idx) => (
            <Square
              key={idx}
              value={value}
              handleClick={() => handleClick(idx)}
            />
          ))}
        </div>
        <div className="text-base mt-4">
          {!restart ? (
            <button
              className="text-white p-4 bg-green-400 rounded-md"
              onClick={() => setSquare(initialValue)}
            >
              Restart
            </button>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default App;
