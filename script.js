const canvas = document.getElementById('canvasmain');
const context = canvas.getContext('2d');

const game = new Game(canvas, 'Me', 'Peter', 'Mary');
game.distributeCards();
game.drawPlayerCards();
game.randomPlayer();
setTimeout(()=>{
    game.clearScreen();
},1000 / 480);
game.enableControls();
game.playRound();







//game.playRound();
//game.drawPlayerCards();







