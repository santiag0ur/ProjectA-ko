class Game {
  constructor(canvas, canvasend, screens, player, enemy1, enemy2) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.screens = screens;
    this.canvasend;
    this.contextend = canvasend.getContext('2d');
    this.player = player;
    this.enemy1 = enemy1;
    this.enemy2 = enemy2;
  }

  displayScreen(name) {
    const screenThatShouldBeDisplayed = this.screens[name];
    const screensThatShouldBeHidden = Object.values(this.screens).filter(
      (screen) => screen !== screenThatShouldBeDisplayed
    );
    screenThatShouldBeDisplayed.style.display = '';
    for (const screen of screensThatShouldBeHidden)
      screen.style.display = 'none';
  }

  start() {
    //start method
    this.playerCardPlayed = []; //Arrays for played cards, if the game is restarted we clean the array
    for (let i = 0; i < this.playerCardPlayed.length; i++) {
      this.playerCardPlayed.shift();
    }
    this.enemy1CardPlayed = [];
    for (let i = 0; i < this.enemy1CardPlayed.length; i++) {
      this.enemy1CardPlayed.shift();
    }
    this.enemy2CardPlayed = [];
    for (let i = 0; i < this.enemy2CardPlayed.length; i++) {
      this.enemy2CardPlayed.shift();
    }
    this.tableCards = [
      //tablecards are the 3 cards played
      this.playerCardPlayed,
      this.enemy1CardPlayed,
      this.enemy2CardPlayed
    ];
    this.cardsAlreadyPlayed = []; //cards played in previous rounds
    this.playerToPlay = this.player; //player that starts the round
    this.roundSuit = []; //the suit that wins this round, stablish by the one who plays 1st
    this.winner = ''; //winner of the game
    this.textForTheEnd = ''; //text that will be shown at the end of the game
    this.stepForNextRound = true; //boolean to prevent start another round before human player turn finishes
    this.gameRunning = true; //boolean for loop the game until there are no more cards
    this.distributeCards(); //calling method for distribute cards between the players
    this.randomPlayer(); //select a random player to start the game
    this.enableControls(); //enable keyboard for playing
    this.displayScreen('playing'); //show the screen for playing
    this.loop(); //start loop of the game
  }

  loop() {
    switch (this.gameRunning) {
      case true: //check if there are any cards left for playing
        this.playRound(); //call for playing the round
        this.paint(); //paint all the elements of the screen
        window.requestAnimationFrame(() => {
          this.loop();
        });
        break;
      case false: //game has end, it is selected the text depending on the winner
        this.contextend.font = '20px sans-serif';
        switch (this.player.score == this.enemy1.score) {
          case false:
            switch (this.player.score > this.enemy1.score) {
              case true:
                switch (this.player.score == this.enemy2.score) {
                  case false:
                    switch (this.player.score > this.enemy2.score) {
                      case true: //human player wins
                        this.contextend.fillText(
                          `Congratulations! ${this.player.name} wins`,
                          100,
                          50
                        );
                        this.drawfinalScore();
                        break;
                      case false: //enemy2 wins
                        this.contextend.fillText(
                          `You lose! :( ${this.enemy2.name} wins`,
                          100,
                          50
                        );
                        this.drawfinalScore();
                        break;
                    }
                    break;
                  case true: //draw between human player and enemy2
                    this.contextend.font = '15px sans-serif';
                    this.contextend.fillText(
                      `Draw! ${this.player.name} and ${this.enemy2.name}with same points!!!`,
                      100,
                      50
                    );
                    this.drawfinalScore();
                    break;
                }
                break;
              case false:
                switch (this.enemy1.score == this.enemy2.score) {
                  case false:
                    switch (this.enemy1.score > this.enemy2.score) {
                      case true: //enemy1 wins
                        this.contextend.font = '20px sans-serif';
                        this.contextend.fillText(
                          `You lose! :( ${this.enemy1.name} wins`,
                          100,
                          50
                        );
                        this.drawfinalScore();
                        break;
                      case false: //enemy2 wins
                        this.contextend.fillText(
                          `You lose! :( ${this.enemy2.name} wins`,
                          100,
                          50
                        );
                        this.drawfinalScore();
                        break;
                    }
                    break;
                  case true: //draw between enemy1 and enemy2
                    this.contextend.font = '12px sans-serif';
                    this.contextend.fillText(
                      `You lose! :( Draw! ${this.enemy1.name} and ${this.enemy2.name}with same points!!!`,
                      100,
                      50
                    );
                    this.drawfinalScore();
                    break;
                }
                break;
            }
            break;
          case true:
            switch (this.player.score == this.enemy2.score) {
              case false:
                switch (this.player.score > this.enemy2.score) {
                  case true: //draw betwenn human player and enemy1
                    this.contextend.font = '12px sans-serif';
                    this.contextend.fillText(
                      `Draw! ${this.player.name} and ${this.enemy1.name}with same points!!!`,
                      100,
                      50
                    );
                    this.drawfinalScore();
                    break;
                  case false: //enemy2 wins
                    this.contextend.font = '20px sans-serif';
                    this.contextend.fillText(
                      `You lose! :( ${this.enemy2.name} wins`,
                      100,
                      50
                    );
                    this.drawfinalScore();
                    break;
                }
                break;
              case true: //Draw between 3 players
                this.contextend.font = '18px sans-serif';
                this.contextend.fillText(
                  'Draw! 3 players with same points!!!',
                  100,
                  50
                );
                this.drawfinalScore();
                break;
            }
            break;
        }
        this.displayScreen('gameOver'); //After selecting the text we call game over screen
        break;
    }
  }

  paint() {
    setTimeout(() => {
      //setTimeout(() => {
      this.clearScreen();
      // }, 1000 / 1920); //screen is cleared faster than drawings
      //setTimeout(() => {
      this.drawPlayerCards(); //cards of 3 players drawn
      this.drawTableCards(); //cards played drawn
      this.clearScore();
      this.drawScore(); //scores drawn
    }, 1000 / 100); //drawings end after clearing
    setTimeout(() => {
      this.displaySelectedCard(); //selector card of human player
      //}, 1000 / 560);
    }, 1000 / 75);
  }

  distributeCards() {
    //create the player and the 2 enemies
    this.player = new Player(this, `${this.player}`);
    this.enemy1 = new Enemy(this, `${this.enemy1}`);
    this.enemy2 = new Enemy(this, `${this.enemy2}`);
    const allCards = []; //create allCards array
    for (const suit of ['clover', 'diamond', 'spade', 'heart']) {
      for (const value of ['1', '3', '4', '5', '6', '7', 'J', 'Q', 'K']) {
        let weight = 0; //loops for provide suit, value, weight and points
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
        } //creation of each card
        const card = new Card(this, suit, value, weight, points);
        allCards.push(card);
      }
    }
    //Shuffle all the cards
    allCards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    for (const cardsOfThePlayers of [this.player, this.enemy1, this.enemy2]) {
      switch (cardsOfThePlayers) {
        case this.player: //first 12 cards for human player
          for (let i = 0; i < 12; i++) {
            cardsOfThePlayers.cards.push(allCards[i]);
          }
          break;
        case this.enemy1: //cards from 12 to 24 to enemy1
          for (let i = 12; i < 24; i++) {
            cardsOfThePlayers.cards.push(allCards[i]);
          }
          break;
        case this.enemy2: //last 12 cards for enemy2
          for (let i = 24; i < 36; i++) {
            cardsOfThePlayers.cards.push(allCards[i]);
          }
          break;
      }
    }
    //Order cards of the player by suit
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
    //Order player cards by weight
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
  } // End of distributeCards method

  randomPlayer() {
    //Select a random player to start the game
    const groupOfPlayers = [this.player, this.enemy1, this.enemy2];
    this.playerToPlay = groupOfPlayers[(Math.random() * 3) << 0];
  }

  playRound() {
    //Start the round
    if (this.stepForNextRound) {
      //If previous human turn isn´t ended do not play
      switch (
        this.playerToPlay //Depending on the player who starts the round some ai are called,
      ) {
        case this.player:
          this.stepForNextRound = false;
          this.displaySelectedCard();
          break;
        case this.enemy1:
          this.stepForNextRound = false;
          this.enemy1.ai();
          this.displaySelectedCard();
          break;
        case this.enemy2:
          this.stepForNextRound = false;
          this.enemy2.ai();
          this.enemy1.ai();
          this.displaySelectedCard();
          break;
      }
    }
  }

  enableControls() {
    //Enable keys right, left and space
    window.addEventListener('keydown', (event) => {
      const key = event.code;
      switch (key) {
        case 'ArrowRight':
          console.log('arrowright');
          this.moveRight();
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
    //if selected card is 0 don´t move further left
    if (this.player.cardSelected != 0) {
      this.player.cardSelected--;
      this.displaySelectedCard();
    }
  }

  moveRight() {
    //if selected card is in the last card don´t move further right
    if (this.player.cardSelected != this.player.cards.length - 1) {
      this.player.cardSelected++;
      this.displaySelectedCard();
    }
  }

  roundWinner() {
    //play the round between the played cards, who wins?
    //the first one who plays stablish the winner suit (roundSuit)
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
    switch (this.playerCardPlayed[0][0].suit == this.roundSuit) {
      case true:
        switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit) {
          case true:
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy1CardPlayed[0][0].weight
                ) {
                  case true:
                    switch (
                      this.playerCardPlayed[0][0].weight >
                      this.enemy2CardPlayed[0][0].weight
                    ) {
                      case true:
                        this.playerWinsRound();
                        break;
                      case false:
                        this.enemy2WinsRound();
                        break;
                    }
                    break;
                  case false:
                    switch (
                      this.enemy1CardPlayed[0][0].weight >
                      this.enemy2CardPlayed[0][0].weight
                    ) {
                      case true:
                        this.enemy1WinsRound();
                        break;
                      case false:
                        this.enemy2WinsRound();
                        break;
                    }
                    break;
                }
                break;
              case false: //enemy2 not roundsuit
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy1CardPlayed[0][0].weight
                ) {
                  case true:
                    this.playerWinsRound();
                    break;
                  case false:
                    this.enemy1WinsRound();
                    break;
                }
                break;
            }
            break;
          case false: //enemy1 not roundsuit
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                switch (
                  this.playerCardPlayed[0][0].weight >
                  this.enemy2CardPlayed[0][0].weight
                ) {
                  case true:
                    this.playerWinsRound();
                    break;
                  case false:
                    this.enemy2WinsRound();
                    break;
                }
                break;
              case false: //enemy2 not roundsuit
                this.playerWinsRound();
                break;
            }
            break;
        }
        break;
      case false: //player not roundsuit
        switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit) {
          case true:
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                switch (
                  this.enemy1CardPlayed[0][0].weight >
                  this.enemy2CardPlayed[0][0].weight
                ) {
                  case true:
                    this.enemy1WinsRound();
                    break;
                  case false:
                    this.enemy2WinsRound();
                    break;
                    break;
                }
              case false:
                this.enemy1WinsRound();
                break;
            }
            break;
          case false: //enemy1 not roundsuit
            switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit) {
              case true:
                this.enemy2WinsRound();
                break;
              case false: //This case is impossible 3 players do not match roundsuit
                break;
            }
            break;
        }
        break;
    }
  } //end of roundWinner

  playerWinsRound() {
    //player wins the round,
    for (let i = 0; i < 3; i++) {
      this.player.score = this.player.score + this.tableCards[i][0][0].points; //Points added to score
      this.cardsAlreadyPlayed.push(this.tableCards[i][0]); //Tablecards to cardsAlreadyPlayed
    }
    this.playerCardPlayed.shift(); //Clear all the arrays of played cards
    this.enemy1CardPlayed.shift();
    this.enemy2CardPlayed.shift();
    this.playerToPlay = this.player; //Next round starts human player
    this.clearScore();
    this.drawScore(); //draw new score
    if (this.player.cards.length == 0) {
      //if there are no more cards the game is ended
      this.gameRunning = false;
    }
    this.stepForNextRound = true; //it is allowed to go for the next round
  }

  enemy1WinsRound() {
    //enemy1 wins the round
    for (let i = 0; i < 3; i++) {
      this.enemy1.score = this.enemy1.score + this.tableCards[i][0][0].points; //points added to score,
      this.cardsAlreadyPlayed.push(this.tableCards[i][0]);
    }
    this.playerCardPlayed.shift(); //table cards cleared,
    this.enemy1CardPlayed.shift();
    this.enemy2CardPlayed.shift();
    this.playerToPlay = this.enemy1; //enemy1 set to start next round
    this.clearScore();
    this.drawScore();
    if (this.player.cards.length == 0) {
      this.gameRunning = false; //if there are no more cards the game is ended
    }
    this.stepForNextRound = true; //it is allowed to go for the next round
  }

  enemy2WinsRound() {
    //enemy2 wins the round
    for (let i = 0; i < 3; i++) {
      this.enemy2.score = this.enemy2.score + this.tableCards[i][0][0].points; //points added to score,
      this.cardsAlreadyPlayed.push(this.tableCards[i][0]);
    }
    this.playerCardPlayed.shift(); //table cards cleared,
    this.enemy1CardPlayed.shift();
    this.enemy2CardPlayed.shift();
    this.playerToPlay = this.enemy2; //enemy2 set to start next round
    this.clearScore();
    this.drawScore();
    if (this.player.cards.length == 0) {
      this.gameRunning = false; //if there are no more cards the game is ended
    }
    this.stepForNextRound = true; //it is allowed to go for the next round
  }

  drawPlayerCards() {
    this.player.paintCards(); //call for display cards of human player
    //display cards enemy1
    let pointerForDraw = this.enemy1.cards.length - 1;
    while (pointerForDraw >= 0) {
      let testimg = new Image();
      let o = pointerForDraw * 35;
      // testimg.src = `${this.enemy1.cards[pointerForDraw].urlImageCardHorizontal}`;      //For drawing the cards of enemy1
      testimg.src = './images/horizontal/card-back1.png'; //disable this line for drawing cards of enemy1
      //enemy1charges horizontal images
      testimg.addEventListener('load', () => {
        context.drawImage(
          testimg,
          20,
          o,
          //testimg.width / 1.4,    //Proportions for drawing the cards of enemy1
          //testimg.height / 1.4
          testimg.width / 2.4, //disable these two lines for drawing cards of enemy1
          testimg.height / 2.2
        );
      });
      pointerForDraw--;
    }
    //display cards enemy2
    pointerForDraw = this.enemy2.cards.length - 1;
    while (pointerForDraw >= 0) {
      let testimg = new Image();
      let o = pointerForDraw * 34 + 83;
      // testimg.src = `${this.enemy2.cards[pointerForDraw].urlImageCard}`;             //For drawing the cards of the enemy2
      testimg.src = './images/card-back1.png'; //disable this line for drawing cards of enemy2
      testimg.addEventListener('load', () => {
        context.drawImage(
          testimg,
          o,
          20,
          //testimg.width / 1.4,    //Proportions for drawing the cards of enemy2
          //testimg.height / 1.4
          testimg.width / 2.2, //disable these two lines for drawing cards of enemy2
          testimg.height / 2.4
        );
      });
      pointerForDraw--;
    }
  } // end of drawPlayerCards method

  clearScreen() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawTableCards() {
    if (this.playerCardPlayed[0] !== undefined) {
      //check card played for human player
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
      //check card played for enemy1
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
      //check card played for enemy2
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
    //ends after drawing the cards
  }

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

  drawfinalScore() {
    this.contextend.font = '15px sans-serif';
    this.contextend.fillText(
      `${this.player.name} --- ${this.player.score}points`,
      100,
      100
    );
    this.contextend.fillText(
      `${this.enemy1.name} --- ${this.enemy1.score}points`,
      100,
      120
    );
    this.contextend.fillText(
      `${this.enemy2.name} --- ${this.enemy2.score}points`,
      100,
      140
    );
  }
} // end of Game class
