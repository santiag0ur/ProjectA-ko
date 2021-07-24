class Player {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.cards = [];
    this.cardSelected = 0;
    this.score = 0;
  }

  paintCards() {
    //display cards player
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
    game.playerCardPlayed.push(this.cards.splice(this.cardSelected, 1));
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
    //delay after playing the cards so the human player can see the cards played
    setTimeout(() => {
      this.game.drawTableCards();
    }, 1000 / 280);
    function callbackToTheRoundWinner() {
      game.roundWinner();
    }
    const timeoutWatchCards = setTimeout(callbackToTheRoundWinner, 5000);
  }
}
