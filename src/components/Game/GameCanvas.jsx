import React, { useRef, useEffect, useMemo } from 'react';

const GameCanvas = ({ dinoY, obstacles, currentSkin }) => {
  const canvasRef = useRef(null);

  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 60; i++) {
      starArray.push({
        x: Math.random() * 1000, y: Math.random() * 250,
        size: Math.random() * 2 + 1, speed: Math.random() * 0.5 + 0.1
      });
    }
    return starArray;
  }, []);

  const drawCactus = (ctx, x, y) => {
    ctx.fillStyle = '#2d5a27';
    ctx.fillRect(x, y - 50, 15, 50);
    ctx.fillRect(x - 10, y - 35, 10, 15);
    ctx.fillRect(x - 10, y - 40, 5, 5); 
    ctx.fillRect(x + 15, y - 45, 10, 20);
    ctx.fillRect(x + 20, y - 50, 5, 5);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const render = () => {
      ctx.fillStyle = '#0a0a12';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#ffffff';
      stars.forEach(star => {
        ctx.globalAlpha = 0.8;
        ctx.fillRect(star.x, star.y, star.size, star.size);
        star.x -= star.speed;
        if (star.x < 0) star.x = canvas.width;
      });
      ctx.globalAlpha = 1.0;

      ctx.strokeStyle = '#333333';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(canvas.width, 350);
      ctx.stroke();

      const dx = 50;
      const dy = 350 - 40 - dinoY;
      const size = 40;

      ctx.save();
      ctx.shadowBlur = 20;
      
      const skinColor = currentSkin?.color || '#535353';
      ctx.shadowColor = skinColor;

      if (!currentSkin || !currentSkin.pattern || currentSkin.pattern === 'solid') {
        ctx.fillStyle = skinColor;
        ctx.fillRect(dx, dy, size, size);
      } else if (currentSkin.pattern === 'gradient') {
        const grad = ctx.createLinearGradient(dx, dy, dx + size, dy + size);
        grad.addColorStop(0, currentSkin.color);
        grad.addColorStop(1, currentSkin.patternColor);
        ctx.fillStyle = grad;
        ctx.fillRect(dx, dy, size, size);
      } else {
        ctx.fillStyle = currentSkin.color;
        ctx.fillRect(dx, dy, size, size);
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = currentSkin.patternColor;

        if (currentSkin.pattern === 'stripes') {
          for (let i = 0; i < 4; i++) {
            ctx.fillRect(dx + i * 10 + 2, dy, 5, size);
          }
        } else if (currentSkin.pattern === 'grid') {
          for (let i = 0; i <= size; i += 8) {
            ctx.fillRect(dx + i, dy, 2, size);
            ctx.fillRect(dx, dy + i, size, 2);
          }
        } else if (currentSkin.pattern === 'checker') {
          for (let i = 0; i < size; i += 10) {
            for (let j = 0; j < size; j += 10) {
              if ((i / 10 + j / 10) % 2 === 0) {
                ctx.fillRect(dx + i, dy + j, 10, 10);
              }
            }
          }
        }
      }
      ctx.restore();
      
      if (obstacles) obstacles.forEach(obs => drawCactus(ctx, obs.x, 350));

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [dinoY, obstacles, currentSkin, stars]);

  return <canvas ref={canvasRef} width={1000} height={400} style={{ width: '100%', height: '100%', display: 'block', objectFit: 'contain' }} />;
};

export default GameCanvas;
