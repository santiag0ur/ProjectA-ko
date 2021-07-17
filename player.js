class Player {
  constructor (game, name){
  this.game = game;
  this.name = name;
  this.cards = [];
  this.cardSelected = 0;
  }

  hi() {
    console.log('playerHI');
    console.log(`${this.name} cards before playing: `);
    console.log(this.cards);
    game.playerCardPlayed.push(this.cards[0].splice(this.cardSelected, 1));
    console.log('tableCards: ')
    console.log(this.game.tableCards);
    console.log(`${this.name} cards after playing: `);
    console.log(this.cards);
    switch (this.game.playerToPlay){
        case this.game.player:
            this.game.enemy2.ai();
            this.game.enemy1.ai();
            break;
        case this.game.enemy1:
            this.game.enemy2.ai();
            break;
        case this.game.enemy2:
            break;
    }
    this.game.drawTableCards();
    this.game.drawPlayerCards();
    this.game.roundWinner();
  }
}