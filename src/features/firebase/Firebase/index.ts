import app from "firebase/app";
import "firebase/database";

import config from "config.json";

type PlaySelectedCards = {
  roundId: string;
  selectedCards: Array<string>;
  trickId: string;
};
class Firebase {
  db: any;
  state: any;
  listeners: Array<any>;
  constructor() {
    app.initializeApp(config.firebaseConfig);

    this.db = app.database();
    this.state = {
      fetch: { currentRound: false, currentTrick: false },
      game: { currentPlayer: null },
      round: { cards: null },
      trick: { cardsPlayed: [], usersPassed: null, counter: 0, type: null }
    };
    this.listeners = [];
  }

  round(roundId: string) {
    const round = this.db.ref(`rounds/${roundId}`);

    return round;
  }

  dealCards(roundId: string, deck: any) {
    this.db.ref(`rounds/${roundId}/cards`).set(deck);
  }

  async getCurrentRound(roundId: string) {
    this.state.fetchCurrentRound = { started: true };
    try {
      const roundV = await this.db.ref(`rounds/${roundId}`).once("value");
      this.state.round = roundV.val();

      this.state.fetch.currentRound = true;
    } catch (e) {}

    return this.state.fetch.currentRound;
  }

  async getCurrentTrick(trickId: string) {
    this.state.fetchCurrentTrick = { started: true };
    try {
      const trickV = await this.db.ref(`tricks/${trickId}`).once("values");
      this.state.trick = trickV.val();

      this.state.fetch.currentTrick = true;
    } catch (e) {}

    return this.state.fetch.currentTrick;
  }

  async playSelectedCards({
    roundId,
    selectedCards,
    trickId
  }: PlaySelectedCards) {
    var updates: { [upd: string]: any } = {};
    selectedCards.forEach(card => {
      updates[`rounds/${roundId}/cards/${card}/played`] = true;
    });
    updates[`tricks/${trickId}`] = {
      cardsPlayed: [...this.state.trick.cardsPlayed, ...selectedCards],
      trickCounter: this.state.trick.counter++,
      type: selectedCards.length
    };

    this.state.trick.cardsPlayed = [
      ...this.state.trick.cardsPlayed,
      ...selectedCards
    ];
    this.state.trick.counter++;
    this.state.trick.type = selectedCards.length;

    if (this.listeners.length) {
      this.listeners.forEach(callback => callback(this.state.trick.counter));
    }

    // this.db.ref().update(updates);
  }

  addTrickListener(callback: (number: number) => void) {
    this.listeners.push(callback);
  }

  getState() {
    return this.state;
  }
}

export default Firebase;
