class Enemy {
  constructor(game, name) {
    this.game = game;
    this.name = name;
    this.cards = [];
    this.score = 0;
  }

  ai() {
    switch (
      this.name //select enemy1 AI or enemy2 AI
    ) {
      case game.enemy1.name:
        if (this.game.playerToPlay.name != this.name) {
          //Another player plays first
          switch (this.game.playerToPlay.name) {
            case this.game.player.name: //Human player plays first
              let cardsWhithTheSameSuitPlayed = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.playerCardPlayed[0][0].suit
              ); //Filter cards with the winning round suit
              let cardsHigherThanTheOnePlayed =
                cardsWhithTheSameSuitPlayed.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.playerCardPlayed[0][0].weight
                ); //Has enemy1 wining cards over player´s one?
              switch (cardsHigherThanTheOnePlayed.length > 0) {
                case true:
                  const cardHigherSelected =
                    cardsHigherThanTheOnePlayed.shift(); //first card higher is selected
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false: //in this case enemy1 hasn´t cards with weight over player´s
                  switch (cardsWhithTheSameSuitPlayed.length > 0) {
                    case true: //enemy1 has cards of the played suit
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsWhithTheSameSuitPlayed.length;
                          i++
                        ) {
                          //cards of the played suit are sorted
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
                      } //enemy1 can´t win this round so the lighter card is played
                      const cardFewerThanTheOnePlayed =
                        cardsWhithTheSameSuitPlayed.pop();
                      game.enemy1CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardFewerThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false: //enemy1 has no cards of the played suit
                      for (let o = 0; o < 12; o++) {
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];
                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                          } //cards sort by weight
                        }
                      } //it´s played the fewer card
                      game.enemy1CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      break;
                  }
                  break;
              }
              break;
            case this.game.enemy2.name: //the enemy2 plays first this round
              let cardsSameSuitPlayedenemy2 = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.enemy2CardPlayed[0][0].suit
              ); //filter cards of the played suit
              let cardsHigherThanenemy2Played =
                cardsSameSuitPlayedenemy2.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.enemy2CardPlayed[0][0].weight
                );
              switch (cardsHigherThanenemy2Played.length > 0) {
                case true: //enemy1 has cards higher than the one played
                  const cardHigherSelected =
                    cardsHigherThanenemy2Played.shift();
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false: //enemy1 has no cards higher than the one played
                  switch (cardsSameSuitPlayedenemy2.length > 0) {
                    case true: //enemy1 has cards of the played suit
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsSameSuitPlayedenemy2.length;
                          i++
                        ) {
                          if (
                            //sort played suit cards by weight
                            cardsSameSuitPlayedenemy2[i].weight <
                            cardsSameSuitPlayedenemy2[i + 1].weight
                          ) {
                            let bbb = cardsSameSuitPlayedenemy2[i],
                              ccc = cardsSameSuitPlayedenemy2[i + 1];
                            cardsSameSuitPlayedenemy2[i] = ccc;
                            cardsSameSuitPlayedenemy2[i + 1] = bbb;
                          }
                        }
                      } //play the fewer card
                      const cardFewerThanTheOnePlayed =
                        cardsSameSuitPlayedenemy2.pop();
                      game.enemy1CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardFewerThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false: //enemy1 has no cards of the played suit
                      for (let o = 0; o < 12; o++) {
                        //sort cards by weight
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];
                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                          }
                        }
                      } //it´s played the fewer card
                      game.enemy1CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      break;
                  }
                  break;
              }
              break;
          }
          // enemy1 is the playerToPlay, the one who plays 1st this round  ----------------------------------
        } else {
          //select the aces of enemy1
          let theNumber1 = this.cards.filter(
            (cardsfiltered) => cardsfiltered.weight == 9
          );
          if (theNumber1.length > 0) {
            //if enemy1 has aces those are played
            game.enemy1CardPlayed.push(
              this.cards.splice(this.cards.indexOf(theNumber1[0]), 1)
            );
          } else {
            //enemy1 has no aces
            let foundCardForPlay = false; //boolean indicates AI found a proper card to play
            let cardsWithPoints = this.cards.filter(
              (cardsfilteredpoints) => cardsfilteredpoints.weight > 4
            ); //filter cards with points
            for (let o = 0; o < cardsWithPoints.length; o++) {
              let filterForTheSuit = cardsWithPoints[o].suit;
              let cardsPlayedSameSuit = game.cardsAlreadyPlayed.filter(
                (cardsfiltered) => cardsfiltered[0].suit == filterForTheSuit
              ); //from the 1st card with points to the last check suit and compare with previous played cards
              if (cardsWithPoints[o].weight == 8 && !foundCardForPlay) {
                //enemy1 has a 3? !foundCardForPlay is to prevent that enemy1 has two '3'cards or more
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //the ace of this suit has already been played
                    game.enemy1CardPlayed.push(
                      this.cards.splice(
                        this.cards.indexOf(cardsWithPoints[o]),
                        1
                      )
                    );
                    foundCardForPlay = true; //enemy1 has played a card, do not play more in this round
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 7 && !foundCardForPlay) {
                //enemy1 has a King
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //the ace has already been played
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        //the 3 has already been played
                        game.enemy1CardPlayed.push(
                          this.cards.splice(
                            this.cards.indexOf(cardsWithPoints[o]),
                            1
                          )
                        );
                        foundCardForPlay = true; //enemy1 has played a card, do not play more in this round
                        break;
                      }
                    }
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 6 && !foundCardForPlay) {
                //enemy1 has a Queen
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    // it´s been played the ace
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        // it´s been played the 3
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            // it´s benn played the King
                            game.enemy1CardPlayed.push(
                              this.cards.splice(
                                this.cards.indexOf(cardsWithPoints[o]),
                                1
                              )
                            );
                            foundCardForPlay = true; //enemy1 has played a card, do not play more in this round
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
                //enemy1 has a Jack
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //ace has been played
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        //3 has been played
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            //King has been played
                            for (
                              let ii = 0;
                              ii < cardsPlayedSameSuit.length;
                              ii++
                            ) {
                              if (cardsPlayedSameSuit[ii][0].weight == 6) {
                                //Queen has been played
                                game.enemy1CardPlayed.push(
                                  this.cards.splice(
                                    this.cards.indexOf(cardsWithPoints[o]),
                                    1
                                  )
                                );
                                foundCardForPlay = true; //enemy1 has played a card, do not play more in this round
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
            // It´s not a good option play the cards with points (there are higher cards on other player´s hands)
            if (!foundCardForPlay) {
              let cardswithNoPoints = this.cards.filter(
                (cardsfiltered) => cardsfiltered.weight < 5
              );
              switch (cardswithNoPoints > 0) {
                case true: //play a card with no points
                  game.enemy1CardPlayed.push(
                    this.cards.splice(
                      this.cards.indexOf(cardswithNoPoints[0]),
                      1
                    )
                  );
                  break;
                case false: //enemy1 hasn´t have cards with no points
                  for (let o = 0; o < 12; o++) {
                    for (let i = 0; i + 1 < this.cards.length; i++) {
                      if (this.cards[i].weight < this.cards[i + 1].weight) {
                        let bbb = this.cards[i],
                          ccc = this.cards[i + 1];

                        this.cards[i] = ccc;
                        this.cards[i + 1] = bbb;
                      }
                    }
                  } //sort by weight and play the fewer card
                  game.enemy1CardPlayed.push(
                    this.cards.splice(this.cards.length - 1, 1)
                  );
                  break;
              }
            }
          }
        }
        break;
      // ------------------------------------------------------------ AI  of Enemy2 ------------------------------------------------------------------------------------------------------------------
      case game.enemy2.name:
        if (this.game.playerToPlay.name != this.name) {
          //Another player plays first
          switch (this.game.playerToPlay.name) {
            case this.game.player.name: //Human player plays first
              console.log(game.playerCardPlayed[0][0].suit);
              let cardsWhithTheSameSuitPlayed = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.playerCardPlayed[0][0].suit
              ); //filter cards wiht the same suit played
              let cardsHigherThanTheOnePlayed =
                cardsWhithTheSameSuitPlayed.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.playerCardPlayed[0][0].weight
                );
              switch (cardsHigherThanTheOnePlayed.length > 0) {
                case true: //enemy2 has cards higher thean the one played
                  let cardHigherSelected = cardsHigherThanTheOnePlayed.shift();
                  console.log(cardHigherSelected);
                  console.log(this.cards.indexOf(cardHigherSelected));
                  game.enemy2CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false: //enemy2 has no cards higher than the one played
                  switch (cardsWhithTheSameSuitPlayed.length > 0) {
                    case true: //enemy2 has cards of the suit played
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsWhithTheSameSuitPlayed.length;
                          i++
                        ) {
                          if (
                            cardsWhithTheSameSuitPlayed[i].weight <
                            cardsWhithTheSameSuitPlayed[i + 1].weight
                          ) {
                            let bbb = cardsWhithTheSameSuitPlayed[i],
                              ccc = cardsWhithTheSameSuitPlayed[i + 1];
                            cardsWhithTheSameSuitPlayed[i] = ccc;
                            cardsWhithTheSameSuitPlayed[i + 1] = bbb;
                          } //sort by weight
                        }
                      } //play the fewer card
                      let cardFewerThanTheOnePlayed =
                        cardsWhithTheSameSuitPlayed.pop();
                      game.enemy2CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardFewerThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false: //enemy2 has no cards of the suit played
                      for (let o = 0; o < 12; o++) {
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];
                            console.log(bbb);
                            console.log(ccc);
                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                          } //sort cards by weight
                        }
                      } //play the fewer card
                      game.enemy2CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      break;
                  }
                  break;
              }
              break; //the enemy1 is the one who plays first
            case this.game.enemy1.name: //----------------------------------------------------------------------
              let cardsSameSuitPlayedenemy1 = this.cards.filter(
                (cardsfiltered) =>
                  cardsfiltered.suit == game.enemy1CardPlayed[0][0].suit
              ); //filter cards of the wining suit
              let cardsHigherThanenemy1Played =
                cardsSameSuitPlayedenemy1.filter(
                  (cardshigher) =>
                    cardshigher.weight > game.enemy1CardPlayed[0][0].weight
                );
              switch (cardsHigherThanenemy1Played.length > 0) {
                case true: //enemy2 has cards higher than enemy1
                  const cardHigherSelected =
                    cardsHigherThanenemy1Played.shift();
                  game.enemy2CardPlayed.push(
                    this.cards.splice(this.cards.indexOf(cardHigherSelected), 1)
                  );
                  break;
                case false: //enemy2 has no cards higher than enemy1
                  switch (cardsSameSuitPlayedenemy1.length > 0) {
                    case true: //enemy2 has cards of the suit of the round
                      for (let o = 0; o < 9; o++) {
                        for (
                          let i = 0;
                          i + 1 < cardsSameSuitPlayedenemy1.length;
                          i++
                        ) {
                          if (
                            cardsSameSuitPlayedenemy1[i].weight <
                            cardsSameSuitPlayedenemy1[i + 1].weight
                          ) {
                            let bbb = cardsSameSuitPlayedenemy1[i],
                              ccc = cardsSameSuitPlayedenemy1[i + 1];
                            cardsSameSuitPlayedenemy1[i] = ccc;
                            cardsSameSuitPlayedenemy1[i + 1] = bbb;
                          } //order by weight
                        }
                      } //play the fewer card
                      let cardLesserThanTheOnePlayed =
                        cardsSameSuitPlayedenemy1.pop();
                      game.enemy2CardPlayed.push(
                        this.cards.splice(
                          this.cards.indexOf(cardLesserThanTheOnePlayed),
                          1
                        )
                      );
                      break;
                    case false: //Enemy2 has no cards of the round suit
                      for (let o = 0; o < 12; o++) {
                        for (let i = 0; i + 1 < this.cards.length; i++) {
                          if (this.cards[i].weight < this.cards[i + 1].weight) {
                            let bbb = this.cards[i],
                              ccc = this.cards[i + 1];

                            this.cards[i] = ccc;
                            this.cards[i + 1] = bbb;
                          } //sort by weight
                        }
                      } //play the fewer card
                      game.enemy2CardPlayed.push(
                        this.cards.splice(this.cards.length - 1, 1)
                      );
                      break;
                  }
                  break;
              }

              break;
          }
          // enemy2 is the playerToPlay, the one who plays 1st this round  ----------------------------------
        } else {
          let theNumber1 = this.cards.filter(
            (cardsfiltered) => cardsfiltered.weight == 9
          ); //enemy2 has aces
          if (theNumber1.length > 0) {
            game.enemy2CardPlayed.push(
              this.cards.splice(this.cards.indexOf(theNumber1[0]), 1)
            );
          } else {
            let foundCardForPlay = false; //boolean check if a card has already been played
            let cardsWithPoints = this.cards.filter(
              (cardsfilteredpoints) => cardsfilteredpoints.weight > 4
            ); //filter cards with points
            for (let o = 0; o < cardsWithPoints.length; o++) {
              let filterForTheSuit = cardsWithPoints[o].suit;
              let cardsPlayedSameSuit = game.cardsAlreadyPlayed.filter(
                (cardsfiltered) => cardsfiltered[0].suit == filterForTheSuit
              ); //compare enemy2 cards with points with the cards that have already been played
              if (cardsWithPoints[o].weight == 8 && !foundCardForPlay) {
                //enemy2 has a 3
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //the ace has been played
                    game.enemy2CardPlayed.push(
                      this.cards.splice(
                        this.cards.indexOf(cardsWithPoints[o]),
                        1
                      )
                    );
                    foundCardForPlay = true; //set boolean card played
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 7 && !foundCardForPlay) {
                //enemy2 has a King
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //ace has been played
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        //3 has been played
                        game.enemy2CardPlayed.push(
                          this.cards.splice(
                            this.cards.indexOf(cardsWithPoints[o]),
                            1
                          )
                        );
                        foundCardForPlay = true; //set boolean card played
                        break;
                      }
                    }
                    break;
                  }
                }
              }
              if (cardsWithPoints[o].weight == 6 && !foundCardForPlay) {
                //enemy2 has a Queen
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //ace has been played
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        //3 has been played
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            //King has been played
                            game.enemy2CardPlayed.push(
                              this.cards.splice(
                                this.cards.indexOf(cardsWithPoints[o]),
                                1
                              )
                            );
                            foundCardForPlay = true; //set boolean card played
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
                //enemy2 has a Jack
                for (let i = 0; i < cardsPlayedSameSuit.length; i++) {
                  if (cardsPlayedSameSuit[i][0].weight == 9) {
                    //ace has been played
                    for (let e = 0; e < cardsPlayedSameSuit.length; e++) {
                      if (cardsPlayedSameSuit[e][0].weight == 8) {
                        //3 has been played
                        for (let u = 0; u < cardsPlayedSameSuit.length; u++) {
                          if (cardsPlayedSameSuit[u][0].weight == 7) {
                            //King has been played
                            for (
                              let ii = 0;
                              ii < cardsPlayedSameSuit.length;
                              ii++
                            ) {
                              if (cardsPlayedSameSuit[ii][0].weight == 6) {
                                //Queen has been played
                                game.enemy2CardPlayed.push(
                                  this.cards.splice(
                                    this.cards.indexOf(cardsWithPoints[o]),
                                    1
                                  )
                                );
                                foundCardForPlay = true; //set boolean card played
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
              //it´s not a good option to play cards with points (the other players have higher cards)
              let cardswithNoPoints = this.cards.filter(
                (cardsfiltered) => cardsfiltered.weight < 5
              ); //filter cards with no points
              switch (cardswithNoPoints > 0) {
                case true: //play a card with no points
                  game.enemy2CardPlayed.push(
                    this.cards.splice(
                      this.cards.indexOf(cardswithNoPoints[0]),
                      1
                    )
                  );
                  break;
                case false: //enemy2 has no cards without points left (play the fewer card)
                  for (let o = 0; o < 12; o++) {
                    for (let i = 0; i + 1 < this.cards.length; i++) {
                      if (this.cards[i].weight < this.cards[i + 1].weight) {
                        let bbb = this.cards[i],
                          ccc = this.cards[i + 1];
                        this.cards[i] = ccc;
                        this.cards[i + 1] = bbb;
                      } //sort by weight
                    }
                  } //play the fewer card
                  game.enemy2CardPlayed.push(
                    this.cards.splice(this.cards.length - 1, 1)
                  );
                  break;
              }
            }
          }
        }
        break;
    }
  }
}
