"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<number>(1);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [playerScores, setPlayerScores] = useState<{[key: number]: number}>({ 1: 0, 2: 0 });
  const [winner, setWinner] = useState<number | null>(null);

  // Generates 12 pairs of random numbers for a 6x4 grid (24 cards total)
  const generateCards = (): number[] => {
    const uniqueNums = Array.from({ length: 12 }, () =>
      Math.floor(Math.random() * 101)
    );
    const pairs = [...uniqueNums, ...uniqueNums];
    return pairs.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setCards(generateCards());
  }, []);

  useEffect(() => {
    if (matched.length === cards.length && cards.length > 0) {
      setGameOver(true);
      // Determine winner
      if (playerScores[1] > playerScores[2]) {
        setWinner(1);
      } else if (playerScores[2] > playerScores[1]) {
        setWinner(2);
      } else {
        setWinner(0); // Tie
      }
    }
  }, [matched, cards, playerScores]);

  const handleFlip = (index: number) => {
    if (
      flipped.length === 2 ||
      flipped.includes(index) ||
      matched.includes(index) ||
      gameOver
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first] === cards[second]) {
        setMatched((prev) => [...prev, first, second]);
        setPlayerScores((prev) => ({
          ...prev,
          [currentPlayer]: prev[currentPlayer] + 1
        }));
        setTimeout(() => {
          setFlipped([]);
        }, 800);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setCurrentPlayer((prev) => (prev === 1 ? 2 : 1));
        }, 1000);
      }
    }
  };

  const handleReset = () => {
    setCards(generateCards());
    setFlipped([]);
    setMatched([]);
    setCurrentPlayer(1);
    setGameOver(false);
    setPlayerScores({ 1: 0, 2: 0 });
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-6">
          Memory Match
        </h1>

        {/* Leaderboard */}
        <div className="flex justify-center space-x-8 mb-6">
          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            currentPlayer === 1 && !gameOver ? 'border-blue-400 bg-blue-900/20' : 'border-slate-600 bg-slate-800/50'
          }`}>
            <h3 className="text-lg font-bold text-blue-400">Player 1</h3>
            <p className="text-2xl font-extrabold text-white">{playerScores[1]}</p>
            <p className="text-sm text-gray-300">matches</p>
          </div>
          <div className={`p-4 rounded-lg border-2 transition-all duration-300 ${
            currentPlayer === 2 && !gameOver ? 'border-red-400 bg-red-900/20' : 'border-slate-600 bg-slate-800/50'
          }`}>
            <h3 className="text-lg font-bold text-red-400">Player 2</h3>
            <p className="text-2xl font-extrabold text-white">{playerScores[2]}</p>
            <p className="text-sm text-gray-300">matches</p>
          </div>
        </div>

        {gameOver ? (
          <div className="flex flex-col items-center justify-center p-6 mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-2xl">
            <h2 className="text-4xl font-extrabold text-white mb-2">
              🎉 Game Over! 🎉
            </h2>
            {winner === 0 ? (
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-300">It&apos;s a Tie! 🤝</p>
                <p className="text-lg text-white/90">Both players scored {playerScores[1]} matches</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-300">
                  🏆 Player {winner} Wins! 🏆
                </p>
                <p className="text-lg text-white/90">
                  Final Score: {playerScores[winner!]} - {playerScores[winner! === 1 ? 2 : 1]}
                </p>
              </div>
            )}
          </div>
        ) : (
          <p
            className={`text-2xl font-bold mb-8 transition-colors duration-300 
            ${currentPlayer === 1 ? "text-blue-400" : "text-red-400"}`}
          >
            <span role="img" aria-label="target">
              🎯
            </span>{" "}
            Current Player: {currentPlayer}
          </p>
        )}

        <button
          onClick={handleReset}
          className="flex items-center justify-center space-x-2 mb-8 px-6 py-2 bg-slate-800 text-gray-300 rounded-full shadow-lg hover:bg-slate-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 mx-auto"
        >
          <span>🔄</span>
          <span>Reset Game</span>
        </button>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 sm:gap-6">
          {cards.map((num, idx) => {
            const isFlipped = flipped.includes(idx) || matched.includes(idx);
            const isMatched = matched.includes(idx);
            return (
              <div
                key={idx}
                onClick={() => handleFlip(idx)}
                className={`relative w-20 h-24 sm:w-28 sm:h-32 rounded-xl shadow-lg transition-all duration-300 cursor-pointer
                ${!isFlipped ? "hover:scale-105 hover:shadow-2xl" : ""}
                ${isMatched ? "opacity-50 pointer-events-none" : ""}
                ${isFlipped ? "animate-pulse" : ""}`}
                style={{ perspective: '1000px' }}
              >
                <div
                  className={`absolute w-full h-full transition-transform duration-500 transform-gpu`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                  }}
                >
                  {/* Card Back (Unflipped) */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center rounded-xl
                    bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-slate-700 text-teal-400 text-3xl font-black"
                    style={{
                      backfaceVisibility: 'hidden'
                    }}
                  >
                    ?
                  </div>

                  {/* Card Front (Flipped) */}
                  <div
                    className="absolute w-full h-full flex items-center justify-center rounded-xl
                    bg-gradient-to-br from-teal-600 to-teal-800 text-white text-2xl sm:text-3xl font-bold"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    {num}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
