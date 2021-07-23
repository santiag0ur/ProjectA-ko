class Enemy {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.cards = [];
    //this.cardsWon = [];
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
        //debugger;
        if (this.game.playerToPlay.name != this.name) {
          console.log('Another player plays first');
          switch (this.game.playerToPlay.name) {
            case this.game.player.name:
              console.log('the player is the one who plays first');
              console.log(game.playerCardPlayed[0][0].suit);
              let cardsWhithTheSameSuitPlayed = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.playerCardPlayed[0][0].suit
              );
              console.log('cardsWhithTheSameSuitPlayed');
              console.log(cardsWhithTheSameSuitPlayed);
              let cardsHigherThanTheOnePlayed =
                cardsWhithTheSameSuitPlayed.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.playerCardPlayed[0][0].weight
                );
              console.log('cardsHigherThanTheOnePlayed');
              console.log(cardsHigherThanTheOnePlayed);
              switch (cardsHigherThanTheOnePlayed.length > 0) {
                case true:
                  console.log('cardsHigherThanTheOnePlayed.length > 0 true');
                  const cardHigherSelected =
                    cardsHigherThanTheOnePlayed.shift();
                  console.log(cardHigherSelected);
                  console.log(this.cards.indexOf(cardHigherSelected));
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false:
                  console.log('cardsHigherThanTheOnePlayed.length > 0 false');
                  switch (cardsWhithTheSameSuitPlayed.length > 0) {
                    case true:
                      console.log(
                        'cardsWhithTheSameSuitPlayed.length > 0 true'
                      );
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsWhithTheSameSuitPlayed.length;
                          i++
                        ) {
                          console.log('i');
                          console.log(i);
                          if (
                            cardsWhithTheSameSuitPlayed[i].weight <
                            cardsWhithTheSameSuitPlayed[i + 1].weight
                          ) {
                            let bbb = cardsWhithTheSameSuitPlayed[i],
                              ccc = cardsWhithTheSameSuitPlayed[i + 1];
                            cardsWhithTheSameSuitPlayed[i] = ccc;
                            cardsWhithTheSameSuitPlayed[i + 1] = bbb;
                          }
                        }
                      }
                      console.log('cardsWhithTheSameSuitPlayed');
                      console.log(cardsWhithTheSameSuitPlayed);
                      const cardLesserThanTheOnePlayed =
                        cardsWhithTheSameSuitPlayed.pop();
                      console.log('cardLesserThanTheOnePlayed');
                      console.log(cardLesserThanTheOnePlayed);
                      game.enemy1CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardLesserThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false:
                      console.log(
                        'cardsWhithTheSameSuitPlayed.length > 0 false'
                      );
                      console.log('this.cards.length');
                      console.log(this.cards.length);
                      for (let o = 0; o < 12; o++) {
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          console.log('i');
                          console.log(i);
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            console.log('this.cards[i]');
                            console.log(this.cards[i]);
                            console.log('this.cards[i+1]');
                            console.log(this.cards[i + 1]);
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];
                            console.log(bbb);
                            console.log(ccc);
                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                            console.log('this.cards[i]');
                            console.log(this.cards[i]);
                            console.log('this.cards[i+1]');
                            console.log(this.cards[i + 1]);
                          }
                        }
                        console.log('this.cards');
                        console.log(this.cards);
                        console.log('o');
                        console.log(o);
                      }
                      console.log('this.cards');
                      console.log(this.cards);
                      game.enemy1CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      console.log('game.enemy1CardPlayed');
                      console.log(game.enemy1CardPlayed);
                      break;
                  }
                  break;
              }
              //console.log(this.cards.indexOf(cardHigherSelected));

              break;
            case this.game.enemy2.name:
              console.log('the enemy2 is the one who plays first'); //----------------------------------------------------------------------
              console.log(game.enemy2CardPlayed[0][0].suit);
              let cardsSameSuitPlayedenemy2 = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.enemy2CardPlayed[0][0].suit
              );
              console.log('cardsSameSuitPlayedenemy2');
              console.log(cardsSameSuitPlayedenemy2);
              let cardsHigherThanenemy2Played =
                cardsSameSuitPlayedenemy2.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.enemy2CardPlayed[0][0].weight
                );
              console.log('cardsHigherThanenemy2Played');
              console.log(cardsHigherThanenemy2Played);
              switch (cardsHigherThanenemy2Played.length > 0) {
                case true:
                  console.log('cardsHigherThanenemy2Played.length > 0 true');
                  const cardHigherSelected =
                    cardsHigherThanenemy2Played.shift();
                  console.log(cardHigherSelected);
                  console.log(this.cards.indexOf(cardHigherSelected));
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false:
                  console.log('cardsHigherThanenemy2Played.length > 0 false');
                  switch (cardsSameSuitPlayedenemy2.length > 0) {
                    case true:
                      console.log('cardsSameSuitPlayedenemy2.length > 0 true');
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsSameSuitPlayedenemy2.length;
                          i++
                        ) {
                          console.log('i');
                          console.log(i);
                          if (
                            cardsSameSuitPlayedenemy2[i].weight <
                            cardsSameSuitPlayedenemy2[i + 1].weight
                          ) {
                            let bbb = cardsSameSuitPlayedenemy2[i],
                              ccc = cardsSameSuitPlayedenemy2[i + 1];
                            cardsSameSuitPlayedenemy2[i] = ccc;
                            cardsSameSuitPlayedenemy2[i + 1] = bbb;
                          }
                        }
                      }
                      console.log('cardsSameSuitPlayedenemy2');
                      console.log(cardsSameSuitPlayedenemy2);
                      const cardLesserThanTheOnePlayed =
                        cardsSameSuitPlayedenemy2.pop();
                      console.log('cardLesserThanTheOnePlayed');
                      console.log(cardLesserThanTheOnePlayed);
                      game.enemy1CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardLesserThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false:
                      console.log('cardsSameSuitPlayedenemy2 > 0 false');
                      console.log('this.cards.length');
                      console.log(this.cards.length);
                      for (let o = 0; o < 12; o++) {
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          console.log('i');
                          console.log(i);
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];

                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                          }
                        }
                        console.log('this.cards');
                        console.log(this.cards);
                        console.log('o');
                        console.log(o);
                      }
                      console.log('this.cards');
                      console.log(this.cards);
                      game.enemy1CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      console.log('game.enemy1CardPlayed');
                      console.log(game.enemy1CardPlayed);
                      break;
                  }
                  break;
              }

              break;
          }
          // enemy1 is the playerToPlay, the one who plays 1st this round
        } else {
          let theNumber1 = this.cards.filter(
            (cardsfiltered) => cardsfiltered.weight == 9
          );
          console.log('theNumber1');
          console.log(theNumber1);
          if (theNumber1.length > 0) {
            game.enemy1CardPlayed.push(
              this.cards.splice(this.cards.indexOf(theNumber1[0]), 1)
            );
          } else {
            let foundCardForPlay = false;
            let cardsWithPoints = this.cards.filter(
              (cardsfilteredpoints) => cardsfilteredpoints.weight > 4
            );
            console.log('cardsWithPoints');
            console.log(cardsWithPoints);
            for (let o = 0; o < cardsWithPoints.length; o++) {
              let filterForTheSuit = cardsWithPoints[o].suit;
              console.log('filterForTheSuit');
              console.log(filterForTheSuit);
              let cardsPlayedSameSuit = game.cardsAlreadyPlayed.filter(
                (cardsfiltered) => cardsfiltered[0].suit == filterForTheSuit
              );
              console.log('cardsWithPoints[o]');
              console.log(cardsWithPoints[o]);
              console.log('game.cardsAlreadyPlayed');
              console.log(game.cardsAlreadyPlayed);
              console.log('filterForTheSuit');
              console.log(filterForTheSuit);
              console.log('cardsPlayedSameSuit');
              console.log(cardsPlayedSameSuit);

              if (cardsWithPoints[o].weight == 8 && !foundCardForPlay) {
                console.log('enemy1 has a 3');
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    console.log('The 1 has already been played');
                    game.enemy1CardPlayed.push(
                      this.cards.splice(
                        this.cards.indexOf(cardsWithPoints[o]),
                        1
                      )
                    );
                    foundCardForPlay = true;
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 7 && !foundCardForPlay) {
                console.log('enemy1 has a 3');
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    console.log('The 1 has already been played');
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        console.log('The 3 has already been played');
                        game.enemy1CardPlayed.push(
                          this.cards.splice(
                            this.cards.indexOf(cardsWithPoints[o]),
                            1
                          )
                        );
                        foundCardForPlay = true;
                        break;
                      }
                    }
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 6 && !foundCardForPlay) {
                console.log('enemy1 has a 3');
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    console.log('The 1 has already been played');
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        console.log('The 3 has already been played');
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            console.log('The K has already been played');
                            game.enemy1CardPlayed.push(
                              this.cards.splice(
                                this.cards.indexOf(cardsWithPoints[o]),
                                1
                              )
                            );
                            foundCardForPlay = true;
                            break;
                          }
                        }
                        break;
                      }
                    }
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 5 && !foundCardForPlay) {
                console.log('enemy1 has a 3');
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    console.log('The 1 has already been played');
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        console.log('The 3 has already been played');
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            console.log('The K has already been played');
                            for (
                              let ii = 0;
                              ii < cardsPlayedSameSuit.length;
                              ii++
                            ) {
                              if (cardsPlayedSameSuit[ii][0].weight == 6) {
                                console.log('The Q has alredy been played');
                                game.enemy1CardPlayed.push(
                                  this.cards.splice(
                                    this.cards.indexOf(cardsWithPoints[o]),
                                    1
                                  )
                                );
                                foundCardForPlay = true;
                                break;
                              }
                            }
                            break;
                          }
                        }
                        break;
                      }
                    }
                    break;
                  }
                }
              }
            }
            if (!foundCardForPlay) {
              let cardswithNoPoints = this.cards.filter(
                (cardsfiltered) => cardsfiltered.weight < 5
              );
              switch (cardswithNoPoints > 0) {
                case true:
                  game.enemy1CardPlayed.push(
                    this.cards.splice(
                      this.cards.indexOf(cardswithNoPoints[0]),
                      1
                    )
                  );
                  break;
                case false:
                  for (let o = 0; o < 12; o++) {
                    for (let i = 0; i + 1 < this.cards.length; i++) {
                      console.log('i');
                      console.log(i);
                      if (this.cards[i].weight < this.cards[i + 1].weight) {
                        let bbb = this.cards[i],
                          ccc = this.cards[i + 1];

                        this.cards[i] = ccc;
                        this.cards[i + 1] = bbb;
                      }
                    }
                    console.log('this.cards');
                    console.log(this.cards);
                    console.log('o');
                    console.log(o);
                  }
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.length - 1, 1)
                  );
                  break;
              }
            }
          }
        }
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
