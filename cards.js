class Card{
  constructor (game, suit, value){  
    this.game = game;
    // this.name = name;
    this.suit = suit;
    this.value = value;
    this.urlImageCard = `./images/${suit}${value}.png`;
    this.urlImageCardHorizontal = `./images/horizontal/${suit}${value}.png`;

  }
}


