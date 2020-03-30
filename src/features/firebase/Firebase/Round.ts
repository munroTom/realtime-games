import { Deck } from "features/president/types";
import dealDeck from "features/president/logic/deal";
import { getMyUnplayedCards as _getMyUnplayedCards } from "features/president/logic/utils";

import { generateGameId } from "../utils";

import Game from "./Game";
import User from "./User";

const NUMBER_OF_SWAPS = 1;

const pathToRounds = "rounds/";
const pathToRound = (roundId: string) => pathToRounds + roundId;
const pathToDeck = (roundId: string) => `${pathToRound(roundId)}/deck`;
const pathToTrickId = (roundId: string) => `${pathToRound(roundId)}/trickId`;
const pathToNumberOfSwaps = (roundId: string) =>
  `${pathToRound(roundId)}/numberOfSwaps`;
const pathToCardPlayed = (roundId: string, card: string) =>
  `${pathToDeck(roundId)}/${card}/deck`;
const pathToCurrentTrick = (roundId: string) =>
  `${pathToDeck(roundId)}/currentTrick`;

type Constructor = { db: any; game: Game; user: User };

type State = {
  roundId: string | null;
  currentTrick: string | null;
  prevTrick: string | null;
  counter: number;
  deck: Deck | null;
  myUnplayedCards: Array<string> | null;
  numberOfSwaps: number;
  finishOrder: Array<string>;
};
const initState = {
  currentTrick: null,
  prevTrick: null,
  roundId: null,
  counter: 0,
  deck: null,
  myUnplayedCards: null,
  numberOfSwaps: 0,
  finishOrder: []
};
class Round {
  db: any;
  state: State;
  game: Game;
  user: User;
  swapListeners: Array<(count: number) => void>;
  constructor({ db, game, user }: Constructor) {
    this.db = db;
    this.state = initState;
    this.game = game;
    this.user = user;
    this.swapListeners = [];
  }

  getState() {
    return this.state;
  }

  startRound(currentTrick: string) {
    const roundId = generateGameId();
    const { counter, myUnplayedCards, roundId: p, ...state } = initState;

    const { players } = this.game.getState();

    if (players) {
      const updates = this.game.updateRounds(roundId);
      const dealtCards = dealDeck(Object.keys(players));

      // updates[pathToRound(roundId)] = {
      //   ...state,
      //   deck: dealtCards,
      //   currentTrick
      // };

      return updates;
    }
    return {};
  }

  dealCards() {
    const roundId = "test"; //generateGameId();

    const { players } = this.game.getState();
    if (players) {
      const updates = this.game.updateRounds(roundId);
      const dealtCards = dealDeck(Object.keys(players));

      updates[pathToRound(roundId)] = {
        ...this.state,
        deck: dealtCards
      };

      return updates;
    }
    return {};
  }

  async getMyUnplayedCards() {
    const roundId = "test"; //this.state.roundId;
    const { userId } = this.user.getState();
    if (roundId && userId) {
      const deckVal = await this.db.ref(pathToDeck(roundId)).once("value");
      const deck = deckVal.val();
      const myUnplayedCards = _getMyUnplayedCards(deck, userId);
      return myUnplayedCards;
    }
  }

  playSelectedCards(selectedCards: Array<string>) {
    const { roundId } = this.state;
    const updates: { [upd: string]: any } = {};
    if (roundId) {
      selectedCards.forEach(card => {
        updates[pathToCardPlayed(roundId, card)] = true;
      });
    }
    return updates;
  }

  listenForPlayerSwap() {
    const { roundId } = this.state;
    if (roundId) {
      this.db.ref(pathToNumberOfSwaps(roundId)).on("value", (snapshot: any) => {
        const numberOfSwaps = snapshot.val();
        if (numberOfSwaps === NUMBER_OF_SWAPS) {
          this.db.ref(pathToNumberOfSwaps(roundId)).off();
        }
      });
    }
  }

  addSwapListener(callback: (count: number) => void) {
    this.swapListeners.push(callback);
  }

  async setTrick(trickId: string) {
    const { roundId } = this.state;
    if (roundId) {
      await this.db.ref(pathToTrickId(roundId)).set(trickId);
    }
  }

  callSwapListeners() {
    this.state.counter++;
    this.swapListeners.forEach(c => c(this.state.counter));
  }

  listenForCurrentTrickChanges() {
    const { roundId } = this.state;

    if (roundId) {
      console.log("listening");
      this.db.ref(pathToCurrentTrick(roundId)).on("value", (snap: any) => {
        console.log("changing");
      });
    }
  }
}

export default Round;
