import React from 'react';

type ScoreProps = {
  score: number; // Puntuación del jugador
};

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div>
      <h2>Score</h2>
      <p>{score}</p>
    </div>
  );
};

export default Score;