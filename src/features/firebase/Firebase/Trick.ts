import { generateGameId } from "../utils";

import Game from "./Game";
import User from "./User";
import Round from "./Round";

type Constructor = { db: any; game: Game; user: User; round: Round };
type State = {
  trickId: null | string;
  started: boolean;
  usersPassed: Array<string>;
  cardsPlayed: Array<string>;
};
type Callback = (cards: Array<string>) => void;

type PlaySelectedCards = {
  selectedCards: Array<string>;
};

const pathToTricks = "tricks/";
const pathToTrick = (trickId: string) => pathToTricks + trickId;
const pathToTrickCardsPlayed = (trickId: string) =>
  `${pathToTrick(trickId)}/cardsPlayed`;

const initState = {
  trickId: null,
  started: false,
  usersPassed: [],
  cardsPlayed: []
};
class Trick {
  db: any;
  state: State;
  game: Game;
  user: User;
  round: Round;
  cardsPlayedListener: Array<Callback>;

  constructor({ db, game, user, round }: Constructor) {
    this.db = db;
    this.state = initState;
    this.game = game;
    this.user = user;
    this.round = round;
    this.cardsPlayedListener = [];
    this.listenForCardsBeingPlayed("1");
  }

  getState() {
    return this.state;
  }

  addCardsPlayedListener(callback: (cards: Array<string>) => void) {
    this.cardsPlayedListener.push(callback);
  }

  callCardsPlayedListeners() {
    const { cardsPlayed } = this.state;
    this.cardsPlayedListener.forEach(c => c(cardsPlayed));
  }

  listenForTrickChanges() {
    this.db.ref();
  }

  listenForCardsBeingPlayed(trickId: string) {
    const trickCounterRef = this.db.ref(pathToTrickCardsPlayed(trickId));
    trickCounterRef.on("value", (snapshot: any) => {
      if (snapshot.val()) {
        this.state.cardsPlayed = [...snapshot.val()];
        this.callCardsPlayedListeners();
      }
    });
  }

  playSelectedCards({ selectedCards }: PlaySelectedCards) {
    // const { trickId } = this.state;
    const trickId = "1";

    if (trickId) {
      const updates = this.round.playSelectedCards(selectedCards);
      console.log(this.state.cardsPlayed);
      updates[pathToTrick(trickId)] = {
        cardsPlayed: [...this.state.cardsPlayed, ...selectedCards],
        type: selectedCards.length
      };

      this.db.ref().update(updates);
    }
  }

  startTrick() {
    const trickId = generateGameId();
  }

  startRound() {
    const trickId = generateGameId();
    const updates = this.round.startRound(trickId);
    const { trickId: q, started, ...state } = initState;

    updates[pathToTrick(trickId)] = {
      ...state
    };

    this.db.ref().update(updates);
  }
}

export default Trick;
