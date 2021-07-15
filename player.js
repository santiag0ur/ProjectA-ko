class Player {
  constructor (game, name){
  this.game = game;
  this.name = name;
  this.cards = [];
  }

  hi() {
    console.log('playerHI');
    console.log(`${this.name} cards before playing: `);
    console.log(this.cards);
    game.playerCardPlayed.push(this.cards[0].splice(Math.random() * this.cards[0].length <<0, 1));
    console.log('tableCards: ')
    console.log(this.game.tableCards);
    console.log(`${this.name} cards after playing: `);
    console.log(this.cards);
  }
}