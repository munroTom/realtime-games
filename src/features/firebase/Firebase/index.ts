import * as firebase from "firebase";
import "firebase/database";

import config from "config.json";
import User from "./User";
import Game from "./Game";
import Round from "./Round";
import Trick from "./Trick";

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
  game: Game;
  round: Round;
  trick: Trick;

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
      round: { cards: null },
      trick: { cardsPlayed: [], usersPassed: null, counter: 0, type: null }
    };
    this.listeners = [];

    console.log("instantiating");

    this.user = new User({
      fireAuth: this.auth,
      initState: this.state.user,
      db: this.db
    });

    this.game = new Game({
      db: this.db,
      user: this.user
    });

    this.round = new Round({
      db: this.db,
      user: this.user,
      game: this.game
    });

    this.trick = new Trick({
      db: this.db,
      user: this.user,
      game: this.game,
      round: this.round
    });
  }

  addTrickListener(callback: (number: number) => void) {
    this.listeners.push(callback);
  }

  getState() {
    return this.state;
  }
}

export default Firebase;
