const canvas = document.getElementById('canvasmain');
const context = canvas.getContext('2d');

const canvasend = document.getElementById('canvasend');
const contextend = canvasend.getContext('2d');

const screenStartElement = document.getElementById('screen-start');
const screenPlayingElement = document.getElementById('screen-playing');
const screenGameOverElement = document.getElementById('screen-game-over');

const screenElements = {
  start: screenStartElement,
  playing: screenPlayingElement,
  gameOver: screenGameOverElement
};

const game = new Game(canvas, canvasend, screenElements);
const playername = 'Me';
const enemy1name = 'Peter';
const enemy2name = 'Mary';

const startButton = screenStartElement.querySelector('button');
const tryAgainButton = screenGameOverElement.querySelector('button');

startButton.addEventListener('click', () => {
  game.start();
});

tryAgainButton.addEventListener('click', () => {
  location.reload();
});
