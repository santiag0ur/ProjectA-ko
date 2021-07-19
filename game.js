class Game {
  constructor(canvas, player, enemy1, enemy2) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = player;
    this.enemy1 = enemy1;
    this.enemy2 = enemy2;
  }

  start() {
    this.playerCardPlayed = [];
    this.enemy1CardPlayed = [];
    this.enemy2CardPlayed = [];
    this.tableCards = [
      this.playerCardPlayed,
      this.enemy1CardPlayed,
      this.enemy2CardPlayed
    ];
    this.playerToPlay = this.player;
    this.roundSuit = [];
    this.distributeCards();
    this.randomPlayer();
    this.enableControls();
    this.loop();
  }

  loop() {
    this.runLogic();
    this.paint();
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }

  runLogic() {
    this.playRound();
  }

  paint() {
    console.log('game.paint()');
    setTimeout(() => {
      this.clearScreen();
    }, 1000 / 480);
    this.drawPlayerCards();
    this.drawTableCards();
    this.drawScore();
    this.displaySelectedCard();
  }

  distributeCards() {
    //create the player and the 2 enemies
    this.player = new Player(this, `${this.player}`);
    this.enemy1 = new Enemy(this, `${this.enemy1}`);
    this.enemy2 = new Enemy(this, `${this.enemy2}`);
    //create all the cards of the game
    const allCards = [];
    for (const suit of ['clover', 'diamond', 'spade', 'heart']) {
      for (const value of ['1', '3', '4', '5', '6', '7', 'J', 'Q', 'K']) {
        let weight = 0;
        let points = 0;
        switch (value) {
          case '1':
            weight = 9;
            points = 11;
            break;
          case '3':
            weight = 8;
            points = 10;
            break;
          case 'K':
            weight = 7;
            points = 4;
            break;
          case 'Q':
            weight = 6;
            points = 3;
            break;
          case 'J':
            weight = 5;
            points = 2;
            break;
          case '7':
            weight = 4;
            points = 0;
            break;
          case '6':
            weight = 3;
            points = 0;
            break;
          case '5':
            weight = 2;
            points = 0;
            break;
          case '4':
            weight = 1;
            points = 0;
            break;
        }
        const card = new Card(this, suit, value, weight, points);
        allCards.push(card);
      }
    }
    //shuffle all the cards
    allCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (const cardsOfThePlayers of [this.player, this.enemy1, this.enemy2]) {
      for (let i = 0; i < 12; i++) {
        cardsOfThePlayers.cards.push(allCards[i]);
      }
    }
    //Order cards of the player
    //Order by suit
    this.player.cards.sort(function (a, b) {
      var suitA = a.suit;
      var suitB = b.suit;
      if (suitA < suitB) {
        return -1;
      }
      if (suitA > suitB) {
        return 1;
      }
      if ((suitA = suitB)) {
        return 0;
      }
    });
    //Order by weight
    for (let o = 0; o < 9; o++) {
      for (let i = 0; i < 11; i++) {
        if (this.player.cards[i].suit == this.player.cards[i + 1].suit) {
          if (this.player.cards[i].weight < this.player.cards[i + 1].weight) {
            let bbb = this.player.cards[i],
              ccc = this.player.cards[i + 1];
            this.player.cards[i] = ccc;
            this.player.cards[i + 1] = bbb;
          }
        }
      }
    }
  } // end of distributeCards method

  randomPlayer() {
    const groupOfPlayers = [this.player, this.enemy1, this.enemy2];
    this.playerToPlay = groupOfPlayers[(Math.random() * 3) << 0];
    console.log(`PlayerToPlay = ${this.playerToPlay.name}`);
    console.log(this.playerToPlay);
  }
  //depending on the player to play some ai are called,
  playRound() {
    if (this.player.cards.length == this.enemy1.cards.length) {
      switch (this.playerToPlay) {
        case this.player:
          this.displaySelectedCard();
          break;
        case this.enemy1:
          this.enemy1.ai();
          this.displaySelectedCard();
          break;
        case this.enemy2:
          this.enemy2.ai();
          this.enemy1.ai();
          this.displaySelectedCard();
          break;
      }
    }
  }

  enableControls() {
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowUp':
          console.log('arrowup');
          break;
        case 'ArrowRight':
          console.log('arrowright');
          this.moveRight();
          break;
        case 'ArrowDown':
          console.log('arrowdown');
          break;
        case 'ArrowLeft':
          console.log('arrowleft');
          this.moveLeft();
          break;
        case 'Space':
          console.log('Space');
          this.player.hi();
          break;
      }
    });
  }

  moveLeft() {
    if (this.player.cardSelected != 0) {
      this.player.cardSelected--;
      console.log(this.player.cardSelected);
      this.displaySelectedCard();
    }
  }

  moveRight() {
    console.log(`moveright`);
    console.log(this.player.cardSelected);
    if (this.player.cardSelected != this.player.cards.length - 1) {
      this.player.cardSelected++;
      console.log(this.player.cardSelected);
      this.displaySelectedCard();
    }
  }

  roundWinner() {
    //the first one who plays stablish the winner suit (roundSuit)
    console.log('playerToPlay');
    console.log(this.playerToPlay);
    switch (this.playerToPlay) {
      case this.player:
        this.roundSuit = this.playerCardPlayed[0][0].suit;
        break;
      case this.enemy1:
        this.roundSuit = this.enemy1CardPlayed[0][0].suit;
        break;
      case this.enemy2:
        this.roundSuit = this.enemy2CardPlayed[0][0].suit;
        break;
    }
    //First check if played card is from the winner suit, then compare weights
    console.log('roundSuit');
    console.log(this.roundSuit);
    switch (this.playerCardPlayed[0][0].suit == this.roundSuit) {
      case true:
        console.log('playerOKroundsuit');
        switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit) {
          case true:
            console.log('enemy1OKroundsuit');
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                console.log('enemy2OKrounsuit');
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy1CardPlayed[0][0].weight
                ) {
                  case true:
                    console.log('playerHigherthanenemy1');
                    switch (
                      this.playerCardPlayed[0][0].weight >
                      this.enemy2CardPlayed[0][0].weight
                    ) {
                      case true:
                        console.log('playerwins');
                        this.playerWinsRound();
                        break;
                      case false:
                        console.log('enemy2wins');
                        this.enemy2WinsRound();
                        break;
                    }
                    break;
                  case false:
                    console.log('enemy1Higherthanplayer');
                    switch (
                      this.enemy1CardPlayed[0][0].weight >
                      this.enemy2CardPlayed[0][0].weight
                    ) {
                      case true:
                        console.log('enemy1wins');
                        this.enemy1WinsRound();
                        break;
                      case false:
                        console.log('enemy2wins');
                        this.enemy2WinsRound();
                        break;
                    }
                    break;
                }
                break;
              case false:
                console.log('enemy2NOTrounsuit');
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy1CardPlayed[0][0].weight
                ) {
                  case true:
                    console.log('playerwins');
                    this.playerWinsRound();
                    break;
                  case false:
                    console.log('enemy1wins');
                    this.enemy1WinsRound();
                    break;
                }
                break;
            }
            break;
          case false:
            console.log('enemy1NOTroundsuit');
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                console.log('enemy2OKrounsuit');
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy2CardPlayed[0][0].weight
                ) {
                  case true:
                    console.log('playerwins');
                    this.playerWinsRound();
                    break;
                  case false:
                    console.log('enemy2wins');
                    this.enemy2WinsRound();
                    break;
                }
                break;
              case false:
                console.log('enemy2NOTrounsuit');
                console.log('playerwins');
                this.playerWinsRound();
                break;
            }
            break;
        }
        break;
      case false:
        console.log('playerNOTroundsuit');
        switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit) {
          case true:
            console.log('enemy1OKroundsuit');
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                console.log('enemy2OKrounsuit');
                switch (
                  this.enemy1CardPlayed[0][0].weight >
                  this.enemy2CardPlayed[0][0].weight
                ) {
                  case true:
                    console.log('enemy1wins');
                    this.enemy1WinsRound();
                    break;
                  case false:
                    console.log('enemy2wins');
                    this.enemy2WinsRound();
                    break;
                    break;
                }
              case false:
                console.log('enemy2NOTrounsuit');
                console.log('enemy1wins');
                this.enemy1WinsRound();
                break;
            }
            break;
          case false:
            console.log('enemy1NOTroundsuit');
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                console.log('enemy2OKrounsuit');
                console.log('enemy2wins');
                this.enemy2WinsRound();
                break;
              case false:
                console.log('enemy2NOTrounsuit');
                console.log('thisisimpossible');
                break;
            }
            break;
        }
        break;
    }
  } //end of roundWinner
  //player wins the round points added to score, table cards cleared, player set to start next round
  playerWinsRound() {
    console.log('playerWinsRound');
    console.log('playercardsWon');
    console.log(this.player.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('playerscore');
    console.log(this.player.score);
    console.log('this.tableCards[2][0].points');
    console.log(this.tableCards[2][0][0].points);
    for (let i = 0; i < 3; i++) {
      this.player.score = this.player.score + this.tableCards[i][0][0].points;
      this.player.cardsWon.push(this.tableCards[i]);
    }
    this.playerCardPlayed = [];
    this.enemy1CardPlayed = [];
    this.enemy2CardPlayed = [];
    console.log('playercardsWon');
    console.log(this.player.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('playerscore');
    console.log(this.player.score);
    this.playerToPlay = this.player;
    console.log('playerToPlay');
    console.log(this.playerToPlay);
    this.clearScore();
    this.drawScore();
    console.log('endofplayerWinsRound');
  }
  //enemy1 wins the round points added to score, table cards cleared, enemy1 set to start next round
  enemy1WinsRound() {
    console.log('enemy1WinsRound');
    console.log('enemy1cardsWon');
    console.log(this.enemy1.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('enemy1score');
    console.log(this.enemy1.score);
    console.log('this.tableCards[2][0][0].points');
    console.log(this.tableCards[2][0][0].points);
    for (let i = 0; i < 3; i++) {
      this.enemy1.score = this.enemy1.score + this.tableCards[i][0][0].points;
      this.enemy1.cardsWon.push(this.tableCards[i]);
    }
    this.playerCardPlayed = [];
    this.enemy1CardPlayed = [];
    this.enemy2CardPlayed = [];
    console.log('enemy1cardsWon');
    console.log(this.enemy1.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('enemy1score');
    console.log(this.enemy1.score);
    this.playerToPlay = this.enemy1;
    console.log('playerToPlay');
    console.log(this.playerToPlay);
    this.clearScore();
    this.drawScore();
  }
  //enemy2 wins the round points added to score, table cards cleared, enemy2 set to start next round
  enemy2WinsRound() {
    console.log('enemy2WinsRound');
    console.log('enemy2cardsWon');
    console.log(this.enemy2.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('enemy2score');
    console.log(this.enemy2.score);
    console.log('this.tableCards[2][0][0].points');
    console.log(this.tableCards[2][0][0].points);
    for (let i = 0; i < 3; i++) {
      this.enemy2.score = this.enemy2.score + this.tableCards[i][0][0].points;
      this.enemy2.cardsWon.push(this.tableCards[i]);
    }
    this.playerCardPlayed = [];
    this.enemy1CardPlayed = [];
    this.enemy2CardPlayed = [];
    console.log('enemy2cardsWon');
    console.log(this.enemy2.cardsWon);
    console.log('tableCards');
    console.log(this.tableCards);
    console.log('enemy2score');
    console.log(this.enemy2.score);
    this.playerToPlay = this.enemy2;
    console.log('playerToPlay');
    console.log(this.playerToPlay);
    this.clearScore();
    this.drawScore();
  }

  drawPlayerCards() {
    this.player.paintCards();
    //display cards enemy1
    console.log(`enemy1cards-1 = ${this.enemy1.cards.length - 1}`);
    let pointerForDraw = this.enemy1.cards.length - 1;
    while (pointerForDraw >= 0) {
      let testimg = new Image();
      let o = pointerForDraw * 35;
      testimg.src = `${this.enemy1.cards[pointerForDraw].urlImageCardHorizontal}`;
      testimg.addEventListener('load', () => {
        context.drawImage(
          testimg,
          20,
          o,
          testimg.width / 1.4,
          testimg.height / 1.4
        );
      });
      pointerForDraw--;
    }
    //display cards enemy2
    pointerForDraw = this.enemy2.cards.length - 1;
    while (pointerForDraw >= 0) {
      let testimg = new Image();
      let o = pointerForDraw * 34 + 83;
      testimg.src = `${this.enemy2.cards[pointerForDraw].urlImageCard}`;
      testimg.addEventListener('load', () => {
        context.drawImage(
          testimg,
          o,
          20,
          testimg.width / 1.4,
          testimg.height / 1.4
        );
      });
      pointerForDraw--;
    }
    console.log('end of drawPlayerCards method');
  } // end of drawPlayerCards method

  clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawTableCards() {
    if (this.playerCardPlayed[0] !== undefined) {
      let testimg0 = new Image();
      testimg0.src = `${this.playerCardPlayed[0][0].urlImageCard}`;
      testimg0.addEventListener('load', () => {
        context.drawImage(
          testimg0,
          250,
          300,
          testimg0.width / 1.4,
          testimg0.height / 1.4
        );
      });
    }
    if (this.enemy1CardPlayed[0] !== undefined) {
      let testimg1 = new Image();
      testimg1.src = `${this.enemy1CardPlayed[0][0].urlImageCard}`;
      testimg1.addEventListener('load', () => {
        context.drawImage(
          testimg1,
          200,
          200,
          testimg1.width / 1.4,
          testimg1.height / 1.4
        );
      });
    }
    if (this.enemy2CardPlayed[0] !== undefined) {
      let testimg2 = new Image();
      testimg2.src = `${this.enemy2CardPlayed[0][0].urlImageCard}`;
      testimg2.addEventListener('load', () => {
        context.drawImage(
          testimg2,
          300,
          200,
          testimg2.width / 1.4,
          testimg2.height / 1.4
        );
      });
    }
  }

  //draw red rectangle around selected card
  displaySelectedCard() {
    console.log('displaySelectedCard');
    setTimeout(() => {
      game.clearScreen();
    }, 1000 / 480);
    setTimeout(() => {
      this.drawPlayerCards();
      this.drawTableCards();
      this.clearScore();
      this.drawScore();
    }, 1000 / 320);
    setTimeout(() => {
      this.context.lineWidth = 3;
      this.context.strokeStyle = 'red';
      this.context.beginPath();
      this.context.moveTo(30 + this.player.cardSelected * 40, 440);
      this.context.lineTo(73 + this.player.cardSelected * 40, 440);
      this.context.lineTo(73 + this.player.cardSelected * 40, 499);
      this.context.lineTo(30 + this.player.cardSelected * 40, 499);
      this.context.lineTo(30 + this.player.cardSelected * 40, 439);
      this.context.stroke();
      this.context.closePath();
    }, 1000 / 140);
  }
  //play the round between the played cards, who wins?

  drawScore() {
    this.context.font = '20px sans-serif';
    this.context.fillText(
      `${this.player.name} score: ${this.player.score}`,
      350,
      430
    );
    this.context.fillText(
      `${this.enemy1.name} score: ${this.enemy1.score}`,
      100,
      150
    );
    this.context.fillText(
      `${this.enemy2.name} score: ${this.enemy2.score}`,
      350,
      100
    );
  }
  clearScore() {
    context.clearRect(350, 405, canvas.width, 415);
    context.clearRect(100, 125, canvas.width, 130);
    context.clearRect(350, 80, canvas.width, 100);
  }
} // end of Game class
