import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Dinosaur = ({ y }) => {
  const { skin } = useContext(GameContext);
  
  const skinsMap = {
    classic: '#535353',
    neon: '#00ff00',
    gold: '#ffd700'
  };

  return (
    <div 
      className="dino"
      style={{ 
        bottom: (-y) + 'px',
        backgroundColor: skinsMap[skin] || '#535353',
        borderRadius: '4px'
      }}
    />
  );
};

export default Dinosaur;
