const canvas = document.getElementById('canvasmain');
const context = canvas.getContext('2d');

const game = new Game(canvas, 'Me', 'Peter', 'Mary');
game.distributeCards();
game.drawPlayerCards();
//debugger;
game.randomPlayer();
setTimeout(()=>{
    game.clearScreen();
},1000 / 30);
game.playRound();
setTimeout(()=>{
    game.drawPlayerCards();
    game.drawTableCards(); 
},1000 / 20);




//game.playRound();
//game.drawPlayerCards();







