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
        const card = new Card(this, suit, value);
        allCards.push(card);
      }
    }
    //shuffle all the cards
    allCards.sort(() => (Math.random() > .5) ? 1 : -1);
    for (const cardsOfThePlayers of [this.player, this.enemy1, this.enemy2]){
    cardsOfThePlayers.cards.push(allCards.splice(0, 12));
    } 
    console.log('this.player.cards[0].a.suit');
    console.log(this.player.cards[0][1].suit);
    /*this.player.cards[0].sort(function(a, b) {
        return a.value - b.value;
    });*/
    //this.player.cards[0].suit.sort();  
    
    this.player.cards[0].sort(function(a, b) {
        var suitA = a.suit; // ignore upper and lowercase
        var suitB = b.suit; // ignore upper and lowercase
        var valueA = a.value;
        var valueB = b.value;
        if (suitA < suitB) {
          return -1;
        }
        if (suitA > suitB) {
          return 1;
        }
      if (suitA = suitB) {
        if (valueA = '1'){
              return 1;
          }
        if (valueA = '3' && valueB != '1'){
              return 1;
          }
        if (valueA = 'K' && valueB != '1' && valueB != '3'){
            return 1;
        }
        if (valueA = 'Q' && valueB != '1' && valueB != '3' && valueB != 'K'){
            return 1;
        }
        if (valueA = 'J' && valueB != '1' && valueB != '3' && valueB != 'K' && valueB != 'Q'){
            return 1;
        }
        if (valueB = '1'){
            return -1;
        }
      if (valueB = '3' && valueA != '1'){
            return -1;
        }
      if (valueB = 'K' && valueA != '1' && valueA != '3'){
          return -1;
      }
      if (valueB = 'Q' && valueA != '1' && valueA != '3' && valueA != 'K'){
          return -1;
      }
      if (valueB = 'J' && valueA != '1' && valueA != '3' && valueA != 'K' && valueA != 'Q'){
          return -1;
      }
        if (valueA < valueB){
            return -1;
        }
        if (valueA > valueB){
            return 1;
        }
      }
        // names must be equal
        return 0;
      });
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
            this.player.hi();
            this.enemy2.ai();
            this.enemy1.ai();
            break;
        case this.enemy1:
            this.enemy1.ai();
            this.player.hi();
            this.enemy2.ai();
            break;
        case this.enemy2:
            this.enemy2.ai();
            this.enemy1.ai();
            this.player.hi();
            break;
        }
    }
    clearScreen () {
     
        context.clearRect(0, 0, canvas.width, canvas.height);
        console.log('clearScreen');
    }
    drawTableCards (){
        let testimg0 = new Image;
        testimg0.src = `${this.playerCardPlayed[0][0].urlImageCard}`;
        testimg0.addEventListener('load', () => {
        context.drawImage(testimg0, 250 ,300 , testimg0.width / 1.4, testimg0.height / 1.4);
        });    
        let testimg1 = new Image;
        testimg1.src = `${this.enemy1CardPlayed[0][0].urlImageCard}`;
        testimg1.addEventListener('load', () => {
        context.drawImage(testimg1, 200 ,200 , testimg1.width / 1.4, testimg1.height / 1.4);
        });
        let testimg2 = new Image;
        testimg2.src = `${this.enemy2CardPlayed[0][0].urlImageCard}`;
        testimg2.addEventListener('load', () => {
        context.drawImage(testimg2, 300 ,200 , testimg2.width / 1.4, testimg2.height / 1.4);
        });      
    }        
}// end of Game class
        
        

        
        
        



/*console.log('allCards length:');
console.log(allCards.length);
let o = (Math.random() * allCards.length <<0);
console.log(o);
this.player.cards.push(allCards.splice(o, 1));
console.log(this.player);
console.log(this.player.cards);
console.log(allCards);*/

 /*let test1 = allCards.splice(3,1);
 test1.push(allCards.splice(30,1));
 console.log('value of test1:')
 console.log(test1);
 console.log('value of allCards:')
 console.log(allCards);*/ 




  // console.log('hey');
 // console.log(this.enemy1.cards[5].imageCard);
 //const testimg = new Image;
  //testimg.src = this.enemy2.cards[1].imageCard;
  //console.log(testimg.src);
//testimg.addEventListener('load', () => {
//context.drawImage(testimg, 100, 100);
//});

/*context.lineWidth = 1;
  context.strokeStyle = 'black';
context.beginPath();
context.moveTo(0,0);
context.lineTo(50,50);
context.stroke();*/

/*console.log('values of Player:');
console.log(this.player);
console.log(this.player.cards);
console.log('values of Enemy1:');
console.log(this.enemy1);
console.log(this.enemy1.cards);
console.log('values of Enemy2:');
console.log(this.enemy2);
console.log(this.enemy2.cards);
console.log('allCards: ');
console.log(allCards);*/



/*console.log('wiiiiiiiiiiiiiiiiiiiiiiiiiiii');
console.log(this.player.cards);
console.log(typeof(this.player.cards));
const playerCardstest = Object.values(this.player.cards);
console.log(playerCardstest);
console.log('weeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
console.log(playerCardstest[0]);
console.log(typeof(playerCardstest[0].urlImageCard));
console.log(playerCardstest[0].urlImageCard);*/


/*
function shuffle (array) {
function 
  
}
*/


   //console.log('hello');
    //console.log(this.player);
    //console.log(this.enemy1);
    //console.log(this.enemy2);



/*let o = 0;
for (let i = 0; i < 36; i++){
    switch (allCards.length %3){
        case 0:
            o = (Math.random() * allCards.length <<0);
            this.player.cards.push(allCards.splice(o, 1));
            break;
            case 1:  
            o = (Math.random() * allCards.length <<0);
            this.enemy1.cards.push(allCards.splice(o, 1));
            break;
            case 2:
                o = (Math.random() * allCards.length <<0);
                this.enemy2.cards.push(allCards.splice(o, 1));
                break;
            }
        }
        */
       //console.log (´ hu´);
       //console.log(this.player.cards[3]);
       //console.log(this.player.cards[3].urlImageCard);    



     /*  let pointerForDrawing = 10
while (pointerForDrawing > 0){
    console.log(pointerForDrawing);
    let testimage = new Image;
    testimage.src = `${this.player.cards[pointerForDrawing][0].urlImageCard}`;
    testimage.addEventListener('load', () => {
    context.drawImage(testimage, pointerForDrawing * 200, 200, testimage.width / 2, testimage.height / 2);
    });

    console.log(pointerForDrawing * 200);
    
    pointerForDrawing--;
}*/

/*pointerForDraw = 11
while (pointerForDraw >= 0){
    console.log(pointerForDraw);
    let testimg = new Image;
    let o = pointerForDraw * 40;
    testimg.src = `${this.enemy1.cards[pointerForDraw][0].urlImageCard}`;
    testimg.addEventListener('load', () => {
        context.drawImage(testimg, 200, o, testimg.width / 2, testimg.height / 2);
    });
    
    console.log(`o =${o}`);
    console.log(pointerForDraw * 100);
    
    pointerForDraw--;
}*/