import { useState, useCallback } from 'react';

export const useParticles = () => {
  const [particles, setParticles] = useState([]);

  const addParticle = useCallback((x, y) => {
    setParticles(prev => [
      ...prev,
      {
        id: Math.random(),
        x: x,
        y: y,
        vx: -Math.random() * 2 - 1, 
        vy: -Math.random() * 2,     
        life: 1.0                   
      }
    ]);
  }, []);

  const updateParticles = useCallback(() => {
    setParticles(prev => 
      prev
        .map(p => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - 0.05
        }))
        .filter(p => p.life > 0)
    );
  }, []);

  return { particles, addParticle, updateParticles, setParticles };
};
