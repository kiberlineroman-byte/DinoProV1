const playSound = (type) => {
  const sounds = {
    jump: 'https://www.soundjay.com/buttons/sounds/button-27.mp3',
    death: 'https://www.soundjay.com/buttons/sounds/button-10.mp3',
    coin: 'https://www.soundjay.com/buttons/sounds/button-3.mp3'
  };
  
  const audio = new Audio(sounds[type]);
  audio.volume = 0.2;
  audio.play().catch(e => console.log('Sound blocked by browser'));
};

export default playSound;
