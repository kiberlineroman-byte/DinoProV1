import React, { createContext, useState, useEffect, useCallback } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState('MENU');
  const [skin, setSkin] = useState(localStorage.getItem('selectedSkin') || 'classic');
  const [coins, setCoins] = useState(parseInt(localStorage.getItem('coins')) || 0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('highScore')) || 0);
  const [totalJumps, setTotalJumps] = useState(parseInt(localStorage.getItem('totalJumps')) || 0);
  const [unlockedSkins, setUnlockedSkins] = useState(JSON.parse(localStorage.getItem('unlockedSkins')) || ['classic']);

  useEffect(() => {
    localStorage.setItem('highScore', highScore);
    localStorage.setItem('coins', coins);
    localStorage.setItem('totalJumps', totalJumps);
    localStorage.setItem('unlockedSkins', JSON.stringify(unlockedSkins));
    localStorage.setItem('selectedSkin', skin);
  }, [highScore, coins, totalJumps, unlockedSkins, skin]);

  const addCoins = useCallback((amount) => setCoins(prev => prev + amount), []);
  const addJump = useCallback(() => setTotalJumps(prev => prev + 1), []);

  const skins = [
    { id: 'classic', name: 'Classic', price: 0, color: '#535353', type: 'free', pattern: 'solid' },
    { id: 'neon', name: 'Neon Night', price: 200, color: '#00ff00', type: 'store', pattern: 'solid' },
    { id: 'gold', name: 'Golden King', price: 1000, color: '#ffd700', type: 'store', pattern: 'solid' },
    
    { id: 'tiger', name: 'Wild Tiger', price: 3000, color: '#ff9f43', patternColor: '#2d3436', type: 'store', pattern: 'stripes' },
    { id: 'zebra', name: 'Zebra', price: 4500, color: '#ecf0f1', patternColor: '#2d3436', type: 'store', pattern: 'stripes' },
    { id: 'magma', name: 'Magma Core', price: 7000, color: '#e74c3c', patternColor: '#f1c40f', type: 'store', pattern: 'gradient' },
    { id: 'hacker', name: 'Cyber Hacker', price: 10000, color: '#000000', patternColor: '#00ff00', type: 'store', pattern: 'grid' },
    { id: 'chess', name: 'Grandmaster', price: 15000, color: '#9b59b6', patternColor: '#ffffff', type: 'store', pattern: 'checker' },

    { id: 'emerald', name: 'Emerald Hunter', color: '#2ecc71', type: 'achievement', requirement: '50 Jumps', goal: 50, attr: 'jumps', pattern: 'solid' },
    { id: 'obsidian', name: 'Obsidian God', color: '#1a1a1a', type: 'achievement', requirement: '1000 Score', goal: 1000, attr: 'score', pattern: 'solid' },
    { id: 'ruby', name: 'Ruby Master', color: '#e84118', type: 'achievement', requirement: '500 Jumps', goal: 500, attr: 'jumps', pattern: 'solid' }
  ];

  const achievements = [
    { id: 'a1', name: 'First Leaps', desc: 'Make 50 jumps', goal: 50, type: 'jumps' },
    { id: 'a2', name: 'Rabbit', desc: 'Make 500 jumps', goal: 500, type: 'jumps' },
    { id: 'a3', name: 'Kangaroo', desc: 'Make 2000 jumps', goal: 2000, type: 'jumps' },
    { id: 'a4', name: 'Marathon', desc: 'Reach 1000 score', goal: 1000, type: 'score' },
    { id: 'a5', name: 'Survivor', desc: 'Reach 5000 score', goal: 5000, type: 'score' },
    { id: 'a6', name: 'Godlike', desc: 'Reach 10000 score', goal: 10000, type: 'score' },
    { id: 'a7', name: 'Collector', desc: 'Have 500 coins', goal: 500, type: 'coins' },
    { id: 'a8', name: 'Banker', desc: 'Have 2000 coins', goal: 2000, type: 'coins' },
    { id: 'a9', name: 'Billionaire', desc: 'Have 5000 coins', goal: 5000, type: 'coins' }
  ];

  useEffect(() => {
    skins.forEach(s => {
      if (s.type === 'achievement' && !unlockedSkins.includes(s.id)) {
        if (s.attr === 'jumps' && totalJumps >= s.goal) setUnlockedSkins(p => [...p, s.id]);
        if (s.attr === 'score' && highScore >= s.goal) setUnlockedSkins(p => [...p, s.id]);
      }
    });
  }, [totalJumps, highScore]);

  const buySkin = (sId, price) => {
    if (coins >= price && !unlockedSkins.includes(sId)) {
      setCoins(prev => prev - price);
      setUnlockedSkins(prev => [...prev, sId]);
      return true;
    }
    return false;
  };

  const resetProgress = () => {
    localStorage.clear();
    setHighScore(0);
    setCoins(0);
    setTotalJumps(0);
    setUnlockedSkins(['classic']);
    setSkin('classic');
    window.location.reload();
  };

  return (
    <GameContext.Provider value={{ 
      gameState, setGameState, skin, setSkin, coins, setCoins, highScore, setHighScore, 
      totalJumps, addJump, unlockedSkins, skins, achievements, addCoins, buySkin, resetProgress 
    }}>
      {children}
    </GameContext.Provider>
  );
};
