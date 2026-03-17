import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { GameProvider, GameContext } from './context/GameContext';
import Menu from './components/UI/Menu';
import Settings from './components/UI/Settings';
import Shop from './components/UI/Shop';
import Achievements from './components/UI/Achievements';
import GameCanvas from './components/Game/GameCanvas';
import { useGameLoop } from './hooks/useGameLoop';
import './styles/game.css';

const StarryBackground = () => {
  const stars = useMemo(() => {
    return Array.from({ length: 100 }).map(() => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.5, dur: Math.random() * 4 + 2, del: Math.random() * 3
    }));
  }, []);

  return (
    <div className="stars-bg">
      {stars.map((s, i) => (
        <div key={i} className="star-ui" style={{
          left: `${s.x}%`, top: `${s.y}%`, width: `${s.size}px`, height: `${s.size}px`,
          animationDuration: `${s.dur}s`, animationDelay: `${s.del}s`
        }}></div>
      ))}
    </div>
  );
};

const GameBoard = () => {
  const { setGameState, setHighScore, highScore, addCoins, addJump, skins, skin } = useContext(GameContext);
  const [isDead, setIsDead] = useState(false);
  const [gameId, setGameId] = useState(0);
  
  const currentSkinObj = skins.find(s => s.id === skin) || skins[0];

  const handleGameOver = useCallback((finalScore) => {
    if (finalScore > highScore) setHighScore(finalScore);
    setIsDead(true);
  }, [highScore, setHighScore]);

  const { dinoY, score, obstacles, jump } = useGameLoop(!isDead, handleGameOver, addCoins, gameId);

  const retry = () => {
    setIsDead(false);
    setGameId(prev => prev + 1);
  };

  useEffect(() => {
    const handleAction = (e) => {
      if (isDead && e.code === 'Space') { retry(); return; }
      if (!isDead && (e.code === 'Space' || e.code === 'ArrowUp')) {
        e.preventDefault();
        if (dinoY === 0) { jump(); addJump(); }
      }
    };
    window.addEventListener('keydown', handleAction);
    return () => window.removeEventListener('keydown', handleAction);
  }, [dinoY, isDead, jump, addJump]);

  return (
    <div className="game-container" onClick={isDead ? null : () => { if(dinoY===0) { jump(); addJump(); }}}>
      <div className="game-hud">
        <span>SCORE: {score}</span>
        <span>BEST: {highScore}</span>
      </div>
      
      <GameCanvas dinoY={dinoY} obstacles={obstacles} currentSkin={currentSkinObj} />
      
      {isDead && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center', zIndex: 99999
        }}>
          <h2 style={{fontSize: '5rem', color: '#ff4757', textShadow: '0 0 30px red', margin: 0}}>WASTED</h2>
          <p style={{fontSize: '1.5rem', color: 'white', margin: '20px 0'}}>Final Score: {score}</p>
          <div style={{display: 'flex', gap: '20px'}}>
            <button onClick={retry} style={{padding: '15px 40px', background: '#2ecc71', fontSize: '1.2rem', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>RETRY</button>
            <button onClick={() => setGameState('MENU')} style={{padding: '15px 40px', background: '#555', fontSize: '1.2rem', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer'}}>MENU</button>
          </div>
        </div>
      )}
    </div>
  );
};

const GameContent = () => {
  const { gameState } = useContext(GameContext);
  return (
    <div className="app-wrapper">
      {gameState !== 'PLAYING' && <StarryBackground />}
      {gameState === 'MENU' && <Menu />}
      {gameState === 'SETTINGS' && <Settings />}
      {gameState === 'SHOP' && <Shop />}
      {gameState === 'ACHIEVEMENTS' && <Achievements />}
      {gameState === 'PLAYING' && <GameBoard />}
    </div>
  );
};

function App() { return <GameProvider><GameContent /></GameProvider>; }
export default App;
