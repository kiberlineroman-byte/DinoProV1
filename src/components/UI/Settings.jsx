import React, { useContext } from 'react';
import { GameContext } from '../../context/GameContext';

const Settings = () => {
  const { setGameState, resetProgress } = useContext(GameContext);

  return (
    <div className="ui-panel">
      <h2>Settings</h2>
      <div className="btn-list">
        <button className="danger" onClick={() => {
          if(window.confirm("Delete all progress?")) resetProgress();
        }}>Reset Progress</button>
        <button className="secondary" onClick={() => setGameState('MENU')}>Back</button>
      </div>
    </div>
  );
};

export default Settings;
