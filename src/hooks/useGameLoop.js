import { useState, useEffect, useCallback, useRef } from 'react';

export const useGameLoop = (isActive, onGameOver, onCoinEarned, gameId) => {
  const [dinoY, setDinoY] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [score, setScore] = useState(0);
  
  const velocityRef = useRef(0);
  const dinoYRef = useRef(0);
  const scoreRef = useRef(0);

  useEffect(() => {
    setDinoY(0);
    setObstacles([]);
    setScore(0);
    velocityRef.current = 0;
    dinoYRef.current = 0;
    scoreRef.current = 0;
  }, [gameId]);

  const jump = useCallback(() => {
    if (dinoYRef.current === 0) velocityRef.current = -13;
  }, []);

  useEffect(() => {
    if (!isActive) return;

    let frameId;
    let isCollided = false;

    const loop = () => {
      if (isCollided || !isActive) return;

      velocityRef.current += 0.7;
      dinoYRef.current -= velocityRef.current;
      
      if (dinoYRef.current <= 0) {
        dinoYRef.current = 0;
        velocityRef.current = 0;
      }
      setDinoY(dinoYRef.current);

      scoreRef.current += 1;
      setScore(scoreRef.current);

      if (scoreRef.current > 0 && scoreRef.current % 100 === 0) {
        setTimeout(() => { if (typeof onCoinEarned === 'function') onCoinEarned(10); }, 0);
      }

      setObstacles(prev => {
        const next = prev.map(o => ({ ...o, x: o.x - 9 })).filter(o => o.x > -100);
        
        next.forEach(obs => {
          const dinoRight = 50 + 35;
          const dinoLeft = 50 + 5;
          const cactusLeft = obs.x;
          const cactusRight = obs.x + 30;

          if (dinoRight > cactusLeft && dinoLeft < cactusRight && dinoYRef.current < 40) {
            isCollided = true;
          }
        });

        if (isCollided) {
          setTimeout(() => { if (typeof onGameOver === 'function') onGameOver(scoreRef.current); }, 0);
          return prev;
        }

        if (Math.random() < 0.02 && (next.length === 0 || next[next.length - 1].x < 550)) {
          next.push({ id: Date.now(), x: 1100 });
        }
        return next;
      });

      if (!isCollided) {
        frameId = requestAnimationFrame(loop);
      }
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [isActive, onGameOver, onCoinEarned, gameId]);

  return { dinoY, score, obstacles, jump };
};
