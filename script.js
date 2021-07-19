const canvas = document.getElementById('canvasmain');
const context = canvas.getContext('2d');

const game = new Game(canvas, 'Me', 'Peter', 'Mary');

game.start();

//game.playRound();

//game.playRound();
//game.drawPlayerCards();
