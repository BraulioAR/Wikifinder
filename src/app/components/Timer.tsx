import { useEffect, useState } from 'react';

type TimerProps = {
  duration: number; // Duración en segundos
  onTimeout: () => void; // Función a ejecutar al agotarse el tiempo
};

const Timer: React.FC<TimerProps> = ({ duration, onTimeout }) => {
  const [secondsLeft, setSecondsLeft] = useState(duration);

  useEffect(() => {
    const timer = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft(secondsLeft - 1);
      } else {
        clearInterval(timer);
        onTimeout();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onTimeout]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div>
      <p>Tiempo restante: {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default Timer;