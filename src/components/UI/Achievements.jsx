import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Achievements = () => {
  const { setGameState, achievements, highScore, totalJumps, coins } = useContext(GameContext);

  const checkStatus = (a) => {
    if (a.type === 'jumps') return totalJumps >= a.goal;
    if (a.type === 'score') return highScore >= a.goal;
    if (a.type === 'coins') return coins >= a.goal;
    return false;
  };

  return (
    <div className="ui-card">
      <h2 style={{ color: '#2ecc71', fontSize: '2.5rem', textTransform: 'uppercase' }}>Hall of Fame</h2>
      
      <div className="grid-no-scroll">
        {(achievements || []).map(a => {
          const isDone = checkStatus(a);
          return (
            <div key={a.id} style={{ 
              background: isDone ? 'rgba(46, 204, 113, 0.15)' : '#1a1a1a',
              padding: '15px',
              borderRadius: '12px',
              border: isDone ? '1px solid #2ecc71' : '1px solid #333',
              textAlign: 'left',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h4 style={{ color: isDone ? '#2ecc71' : '#fff', fontSize: '1.1rem', marginBottom: '5px' }}>{a.name}</h4>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>{a.desc}</p>
              </div>
              <span style={{ fontSize: '1.5rem', textShadow: isDone ? '0 0 10px #2ecc71' : 'none' }}>
                {isDone ? '✅' : '🔒'}
              </span>
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

export default Achievements;
