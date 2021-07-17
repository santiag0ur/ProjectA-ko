class Game {
  constructor (canvas, player, enemy1, enemy2){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.player = player;
    this.enemy1 = enemy1;
    this.enemy2 = enemy2;
    this.playerCardPlayed = [];
    this.enemy1CardPlayed = [];
    this.enemy2CardPlayed = [];
    this.tableCards = [this.playerCardPlayed, this.enemy1CardPlayed, this.enemy2CardPlayed];
    this.playerToPlay = this.player;
    this.roundSuit = [];
    }

  distributeCards() {
    //create the player and the 2 enemies
    this.player = new Player (this, `${this.player}`);
    this.enemy1 = new Enemy (this, `${this.enemy1}`);
    this.enemy2 = new Enemy (this, `${this.enemy2}`);
    //create all the cards of the game
    const allCards = [];
    for (const suit of ['clover', 'diamond', 'spade', 'heart']) {
      for (const value of ['1', '3', '4', '5', '6', '7', 'J', 'Q', 'K']) {
        let weight = 0;
        let points = 0;
        switch (value){
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
    allCards.sort(() => (Math.random() > .5) ? 1 : -1);
    for (const cardsOfThePlayers of [this.player, this.enemy1, this.enemy2]){
    cardsOfThePlayers.cards.push(allCards.splice(0, 12));
    } 
//Order cards of the player    
    this.player.cards[0].sort(function(a, b) {
        var suitA = a.suit;
        var suitB = b.suit; 
        if (suitA < suitB) {
          return -1;
        }
        if (suitA > suitB) {
          return 1;
        }
        if (suitA = suitB) {
        return 0;
        }
      });

    for (let o = 0; o < 9; o++){
        for (let i = 0; i < 11; i++) {
            if (this.player.cards[0][i].suit == this.player.cards[0][i + 1].suit){
              if (this.player.cards[0][i].weight < this.player.cards[0][i + 1].weight){
                  let bbb = this.player.cards[0][i], ccc = this.player.cards[0][i + 1];
                  this.player.cards[0][i] = ccc;
                  this.player.cards[0][i + 1] = bbb;    
                }
            }
        }
    }
    } // end of distributeCards method

    drawPlayerCards(){
    console.log('drawPlayerCards');
    
    //display cards player
    console.log(`playercards-1 = ${this.player.cards[0].length - 1}`)
    let pointerForDraw = this.player.cards[0].length - 1;
    while (pointerForDraw >= 0){
        let testimg = new Image;
        let o = pointerForDraw * 40 + 30;
        testimg.src = `${this.player.cards[0][pointerForDraw].urlImageCard}`;
        testimg.addEventListener('load', () => {
            context.drawImage(testimg, o , 440, testimg.width / 1.4, testimg.height / 1.4);
        });
        pointerForDraw--;
    }
    //display cards enemy1
    console.log(`enemy1cards-1 = ${this.enemy1.cards[0].length -1}`)
    pointerForDraw = this.enemy1.cards[0].length - 1;
    while (pointerForDraw >= 0){
        let testimg = new Image;
        let o = pointerForDraw * 35;
        testimg.src = `${this.enemy1.cards[0][pointerForDraw].urlImageCardHorizontal}`;
        testimg.addEventListener('load', () => {
            context.drawImage(testimg, 20 ,o , testimg.width / 1.4, testimg.height / 1.4);
        });
        pointerForDraw--;
    }
    //display cards enemy2
    console.log(`enemy2cards-1 = ${this.enemy2.cards[0].length -1}`)
    pointerForDraw = this.enemy2.cards[0].length - 1;
    while (pointerForDraw >= 0){
        let testimg = new Image;
        let o = pointerForDraw * 34 + 83;
        testimg.src = `${this.enemy2.cards[0][pointerForDraw].urlImageCard}`;
        testimg.addEventListener('load', () => {
            context.drawImage(testimg,o ,20 , testimg.width / 1.4, testimg.height / 1.4);
        });
        pointerForDraw--;
    }
    console.log(`tableCards: `);
    console.log(this.tableCards);
    console.log(`playerCard: `);
    console.log(this.playerCardPlayed);
    console.log(`enemy1rCard: `);
    console.log(this.enemy1CardPlayed);
    console.log(`enemy2Car: `);
    console.log(this.enemy2CardPlayed);    
    } // end of displayPlayerCards method
    randomPlayer(){
    const groupOfPlayers =  [this.player, this.enemy1, this.enemy2];
    this.playerToPlay = groupOfPlayers[(Math.random() * 3 <<0)];
    console.log(`PlayerToPlay = ${this.playerToPlay.name}`);
    console.log(this.playerToPlay);
    }
    playRound (){
        switch (this.playerToPlay){
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
    clearScreen () {
     context.clearRect(0, 0, canvas.width, canvas.height);
    }

    drawTableCards (){
        if (this.playerCardPlayed[0] != undefined){
            let testimg0 = new Image;
            testimg0.src = `${this.playerCardPlayed[0][0].urlImageCard}`;
            testimg0.addEventListener('load', () => {
            context.drawImage(testimg0, 250 ,300 , testimg0.width / 1.4, testimg0.height / 1.4);
            });    
        }
        if (this.enemy1CardPlayed[0] != undefined){
            let testimg1 = new Image;
            testimg1.src = `${this.enemy1CardPlayed[0][0].urlImageCard}`;
            testimg1.addEventListener('load', () => {
            context.drawImage(testimg1, 200 ,200 , testimg1.width / 1.4, testimg1.height / 1.4);
            });
        }
        if (this.enemy2CardPlayed[0] != undefined){
            let testimg2 = new Image;
            testimg2.src = `${this.enemy2CardPlayed[0][0].urlImageCard}`;
            testimg2.addEventListener('load', () => {
            context.drawImage(testimg2, 300 ,200 , testimg2.width / 1.4, testimg2.height / 1.4);
            });      
        }
    }
    
    enableControls () {
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

    moveLeft(){
    if (this.player.cardSelected != 0){
        this.player.cardSelected--;
        console.log(this.player.cardSelected);
        this.displaySelectedCard();
    }
    }

    moveRight(){
    if (this.player.cardSelected != this.player.cards[0].length - 1){
        this.player.cardSelected++;
        console.log(this.player.cardSelected);
        this.displaySelectedCard();
    }
    }

    displaySelectedCard(){
    console.log('displaySelectedCard');
    setTimeout(()=>{
        game.clearScreen();
    },1000 / 480);
    setTimeout(()=>{
        game.drawPlayerCards();
        game.drawTableCards();
    },1000 / 320);
    setTimeout(()=>{
    this.context.lineWidth = 3;
    this.context.strokeStyle = 'red';
    this.context.beginPath();
    this.context.moveTo(30 + this.player.cardSelected * 40,440);
    this.context.lineTo(73 + this.player.cardSelected * 40, 440);
    this.context.lineTo(73 + this.player.cardSelected * 40, 499);
    this.context.lineTo(30 + this.player.cardSelected * 40, 499);
    this.context.lineTo(30 + this.player.cardSelected * 40, 439);
    this.context.stroke();
    this.context.closePath();
}, 1000/240);
    }

    roundWinner(){
        console.log('playerToPlay');
        console.log(this.playerToPlay);
        switch (this.playerToPlay){
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
        //debugger;
        console.log('roundSuit');
        console.log(this.roundSuit);
        switch (this.playerCardPlayed[0][0].suit ==  this.roundSuit){
            case true:
            console.log('playerOKroundsuit');
            switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit){
                case true:
                console.log('enemy1OKroundsuit');
                switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit){
                    case true:
                    console.log('enemy2OKrounsuit');
                    switch (this.playerCardPlayed[0][0].weight > this.enemy1CardPlayed[0][0].weight){
                        case true:
                            console.log('playerHigherthanenemy1');
                            switch (this.playerCardPlayed[0][0].weight > this.enemy2CardPlayed[0][0].weight){
                                case true:
                                    console.log('playerwins');
                                    break;
                                case false:
                                    console.log('enemy2wins');
                                    break;
                            }
                            break;
                        case false:
                            console.log('enemy1Higherthanplayer');
                            switch (this.enemy1CardPlayed[0][0].weight > this.enemy2CardPlayed[0][0].weight){
                                case true:
                                    console.log('enemy1wins');
                                    break;
                                case false:
                                    console.log('enemy2wins');
                                    break;
                            }
                            break;
                    }
                    break;
                    case false:
                    console.log('enemy2NOTrounsuit');
                    switch (this.playerCardPlayed[0][0].weight > this.enemy1CardPlayed[0][0].weight){
                        case true:
                            console.log('playerwins');
                            break;
                        case false:
                            console.log('enemy1wins');
                            break;
                    }
                    break;
                }
                break;
                case false:
                console.log('enemy1NOTroundsuit'); 
                switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit){
                    case true:
                    console.log('enemy2OKrounsuit');
                    switch (this.playerCardPlayed[0][0].weight > this.enemy2CardPlayed[0][0].weight){
                        case true:
                            console.log('playerwins');
                            break;
                        case false:
                            console.log('enemy2wins');
                            break;
                    }
                    break;
                    case false:
                    console.log('enemy2NOTrounsuit');
                    console.log('playerwins');
                    break;
                }
            break;        
            }
            break;
            case false:
            console.log('playerNOTroundsuit');
            switch (this.enemy1CardPlayed[0][0].suit == this.roundSuit){
                case true:
                console.log('enemy1OKroundsuit');
                switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit){
                    case true:
                    console.log('enemy2OKrounsuit');
                    switch (this.enemy1CardPlayed[0][0].weight > this.enemy2CardPlayed[0][0].weight){
                        case true:
                            console.log('enemy1wins');
                            break;
                        case false:
                            console.log('enemy2wins');
                            break;
                    break;
                    }
                    case false:
                    console.log('enemy2NOTrounsuit');
                    console.log('enemy1wins');
                    break;
                }
                break;
                case false:
                console.log('enemy1NOTroundsuit');
                switch (this.enemy2CardPlayed[0][0].suit == this.roundSuit){
                    case true:
                    console.log('enemy2OKrounsuit');
                    console.log('enemy2wins');
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
    }//end of roundWinner


}// end of Game class
