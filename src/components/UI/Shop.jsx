import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Shop = () => {
  const { setGameState, skin, setSkin, unlockedSkins, buySkin, coins, skins } = useContext(GameContext);

  const getSkinStyle = (s) => {
    const base = { width: '50px', height: '50px', margin: '0 auto 15px', borderRadius: '8px', boxShadow: `0 0 15px ${s.color}` };
    
    if (!s.pattern || s.pattern === 'solid') {
      return { ...base, background: s.color };
    }
    if (s.pattern === 'stripes') {
      return { ...base, background: `repeating-linear-gradient(90deg, ${s.color} 0px, ${s.color} 10px, ${s.patternColor} 10px, ${s.patternColor} 15px)` };
    }
    if (s.pattern === 'gradient') {
      return { ...base, background: `linear-gradient(45deg, ${s.color}, ${s.patternColor})` };
    }
    if (s.pattern === 'grid') {
      return { ...base, backgroundColor: s.color, backgroundImage: `linear-gradient(${s.patternColor} 2px, transparent 2px), linear-gradient(90deg, ${s.patternColor} 2px, transparent 2px)`, backgroundSize: '8px 8px' };
    }
    if (s.pattern === 'checker') {
      return { ...base, background: `repeating-conic-gradient(${s.patternColor} 0% 25%, ${s.color} 25% 50%)`, backgroundSize: '20px 20px' };
    }
    return { ...base, background: s.color };
  };

  return (
    <div className="ui-card">
      <h2 style={{fontSize: '2.5rem', color: '#ffd700'}}>SKINS STORE</h2>
      <p style={{fontSize: '1.2rem', marginBottom: '10px'}}>Coins: 🪙 {coins}</p>
      
      <div className="grid-no-scroll">
        {skins.map(s => {
          const isUnlocked = unlockedSkins.includes(s.id);
          const isSelected = skin === s.id;
          return (
            <div key={s.id} className={`skin-item ${isSelected ? 'selected' : ''}`}>
              
              <div style={getSkinStyle(s)}></div>
              
              <p style={{ fontSize: '1rem', marginBottom: '15px', fontWeight: 'bold' }}>{s.name}</p>
              
              {isUnlocked ? (
                <button onClick={() => setSkin(s.id)} style={{ width: '100%', background: isSelected ? '#27ae60' : '#444' }}>
                  {isSelected ? 'EQUIPPED' : 'SELECT'}
                </button>
              ) : s.type === 'store' ? (
                <button onClick={() => buySkin(s.id, s.price)} style={{ width: '100%', background: coins >= s.price ? '#e67e22' : '#555' }}>
                  BUY {s.price} 🪙
                </button>
              ) : (
                <div style={{ background: '#000', color: '#ff4757', padding: '10px', borderRadius: '8px', fontSize: '0.8rem', border: '1px dashed #ff4757' }}>
                  🔒 {s.requirement}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="back-btn-wrapper">
        <button onClick={() => setGameState('MENU')}>BACK TO MENU</button>
      </div>
    </div>
  );
};

export default Shop;
