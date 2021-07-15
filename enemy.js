class Enemy {
constructor (game, name){
  this.game = game;
  this.name = name;
  this.cards = [];
  this.cardsWon = [];
}

ai() {
    console.log(`${this.name}AI`);
    console.log(`${this.name} cards before playing: `);
    console.log(this.cards);
    switch (this.name){
    case game.enemy1.name:
    game.enemy1CardPlayed.push(this.cards[0].splice(Math.random() * this.cards[0].length <<0, 1));
    break;
    case game.enemy2.name:
    game.enemy2CardPlayed.push(this.cards[0].splice(Math.random() * this.cards[0].length <<0, 1));         
    break;
    }
    console.log('tableCards: ')
    console.log(this.game.tableCards);
    console.log(`${this.name} cards after playing: `);
    console.log(this.cards);
} 
}