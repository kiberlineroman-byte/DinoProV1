import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Menu = () => {
  const { setGameState, highScore, coins } = useContext(GameContext);

  return (
    <div className="ui-panel">
      <h1>Dino Pro</h1>
      <div style={{display:'flex', justifyContent:'space-around', fontSize:'1.2rem', color:'#aaa'}}>
        <span>🏆 Best: {highScore}</span>
        <span>🪙 Coins: {coins}</span>
      </div>
      <div className="btn-list">
        <button onClick={() => setGameState('PLAYING')}>Start Game</button>
        <button className="secondary" onClick={() => setGameState('SHOP')}>Skins Store</button>
        <button className="secondary" onClick={() => setGameState('ACHIEVEMENTS')}>Achievements</button>
        <button className="secondary" onClick={() => setGameState('SETTINGS')}>Settings</button>
      </div>
    </div>
  );
};

export default Menu;
