class Card {
  constructor(game, suit, value, weight, points) {
    this.game = game;
    // this.name = name;
    this.suit = suit;
    this.value = value;
    this.weight = weight;
    this.points = points;
    this.urlImageCard = `./images/${suit}${value}.png`;
    this.urlImageCardHorizontal = `./images/horizontal/${suit}${value}.png`;
  }
}
