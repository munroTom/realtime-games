import * as firebase from "firebase";
import "firebase/database";

import config from "config.json";
import User from "./User";

type PlaySelectedCards = {
  roundId: string;
  selectedCards: Array<string>;
  trickId: string;
};
class Firebase {
  db: any;
  state: any;
  listeners: Array<any>;
  user: User;
  auth: firebase.auth.Auth;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config.firebaseConfig);
    }

    this.db = firebase.database();
    this.auth = firebase.auth();
    this.state = {
      user: {
        signedIn: false
      },
      fetch: { currentRound: false, currentTrick: false },
      game: { currentPlayer: null },
      round: { cards: null },
      trick: { cardsPlayed: [], usersPassed: null, counter: 0, type: null }
    };
    this.listeners = [];

    this.user = new User({
      fireAuth: this.auth,
      initState: this.state.user,
      db: this.db
    });
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
