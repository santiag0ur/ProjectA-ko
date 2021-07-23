class Player {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.cards = [];
    this.cardSelected = 0;
    //this.cardsWon = [];
    this.score = 0;
  }

  paintCards() {
    //display cards player
    //console.log('this.player.paintCards()');
    let pointerForDraw = this.cards.length - 1;
    while (pointerForDraw >= 0) {
      let testimg = new Image();
      let o = pointerForDraw * 40 + 30;
      testimg.src = `${this.cards[pointerForDraw].urlImageCard}`;
      testimg.addEventListener('load', () => {
        context.drawImage(
          testimg,
          o,
          440,
          testimg.width / 1.4,
          testimg.height / 1.4
        );
      });
      pointerForDraw--;
    }
  }

  hi() {
    console.log('playerHI');
    console.log(`${this.name} cards before playing: `);
    console.log(this.cards);
    game.playerCardPlayed.push(this.cards.splice(this.cardSelected, 1));
    console.log('tableCards: ');
    console.log(this.game.tableCards);
    console.log(`${this.name} cards after playing: `);
    console.log(this.cards);
    //after playing the card if there are more players to play the ai of the enemies is called
    switch (this.game.playerToPlay) {
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
    //drawing again the cards after playing, call to decide who wins the round
    //this.game.paint();
    setTimeout(() => {
      this.game.drawTableCards();
    }, 1000 / 280);
    function callbackToTheRoundWinner() {
      console.log('callbackToTheRoundWinner');
      game.roundWinner();
    }
    const timeoutWatchCards = setTimeout(callbackToTheRoundWinner, 5000);
  }
}
