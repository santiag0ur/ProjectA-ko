class Enemy {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.cards = [];
    this.cardsWon = [];
    this.score = 0;
  }

  ai() {
    console.log(`${this.name}AI`);
    console.log(`${this.name} cards before playing: `);
    console.log(this.cards);
    switch (this.name) {
      case game.enemy1.name:
        console.log('game.enemy1CardPlayed');
        console.log(game.enemy1CardPlayed);
        game.enemy1CardPlayed.push(
          this.cards.splice((Math.random() * this.cards.length) << 0, 1)
        );
        console.log('game.enemy1CardPlayed');
        console.log(game.enemy1CardPlayed);
        break;
      case game.enemy2.name:
        console.log('game.enemy2CardPlayed');
        console.log(game.enemy2CardPlayed);
        game.enemy2CardPlayed.push(
          this.cards.splice((Math.random() * this.cards.length) << 0, 1)
        );
        console.log('game.enemy2CardPlayed');
        console.log(game.enemy2CardPlayed[0]);
        break;
    }
    console.log('tableCards: ');
    console.log(this.game.tableCards);
    console.log(`${this.name} cards after playing: `);
    console.log(this.cards);
    console.log(`enemy1CardPlayed:`);
    console.log(game.enemy1CardPlayed);
    console.log(`enemy2CardPlayed:`);
    console.log(game.enemy1CardPlayed);
  }
}
