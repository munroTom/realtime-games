import * as firebase from "firebase";

import { generateGameId } from "../utils";

const pathToGames = "games/";
const pathToGame = (gameId: string) => pathToGames + gameId;
const pathToGamePlayers = (gameId: string) => `${pathToGame(gameId)}/players`;
const pathToGameCurrentRound = (gameId: string) =>
  `${pathToGame(gameId)}/currentRound`;
const pathToGamePlayer = (gameId: string, userId: string) =>
  `${pathToGame(gameId)}/players/${userId}`;

type Constructor = { db: any; user: any };

type GamePlayers = { [userId: string]: string };
type State = {
  players: GamePlayers | null;
  currentPlayer: string | null;
  currentRound: string | null;
  previousRound: string | null;
  gameId: string | null;
  counter: number;
};
const initState = {
  players: null,
  currentPlayer: null,
  gameId: null,
  counter: 0,
  currentRound: null,
  previousRound: null
};
class Game {
  db: any;
  state: State;
  user: any;
  playerJoinListeners: Array<(count: number) => void>;
  currentRoundListeners: Array<(id: string) => void>;
  constructor({ db, user }: Constructor) {
    this.db = db;
    this.state = initState;
    this.user = user;
    this.playerJoinListeners = [];
    this.currentRoundListeners = [];
  }

  getState() {
    return this.state;
  }

  async createGame() {
    try {
      const { displayName, userId } = this.user.getState();
      const gameId = "7364aefq6"; //generateGameId();

      if (!(displayName && userId && gameId)) {
        throw new Error("insufficient arguments to create game");
      }

      await this.db.ref(pathToGame(gameId)).set({
        players: { [userId]: displayName }
      });

      this.state = {
        ...this.state,
        players: { [userId]: displayName },
        gameId
      };

      this.listenForPlayerJoining(gameId);
      this.listenForCurrentRoundIdChange(gameId);

      return gameId;
    } catch (e) {
      return false;
    }
  }

  async joinGame(gameId: string) {
    try {
      const { userId, displayName, signedIn } = this.user.getState();

      if (signedIn) {
        await this.db.ref(pathToGamePlayer(gameId, userId)).set(displayName);

        const gameVal = await this.db.ref(pathToGame(gameId)).once("value");

        this.state = {
          ...this.state,
          ...gameVal.val(),
          gameId
        };
        this.callPlayerJoinListeners();
        this.listenForPlayerJoining(gameId);
        this.listenForCurrentRoundIdChange(gameId);

        return true;
      }
      return false;
    } catch (e) {
      console.log("error");
      console.log(e);
      return false;
    }
  }

  async joinGameIfNecessary(gameId: string) {
    const { signedIn } = this.user.getState();

    if (signedIn && gameId !== this.state.gameId) {
      await this.joinGame(gameId);
    }
  }

  async leaveCurrentGame() {
    const { gameId } = this.state;
    const { userId } = this.user.getState();

    if (userId && gameId) {
      this.db.ref(pathToGamePlayer(gameId, userId)).remove();
      this.db.ref(pathToGamePlayers(gameId)).off();
      this.db.ref(pathToGameCurrentRound(gameId)).off();

      this.state = initState;
    }
  }

  listenForPlayerJoining(gameId: string) {
    this.db.ref(pathToGamePlayers(gameId)).on("value", (snapshot: any) => {
      const players = snapshot.val();
      this.state.players = players;
      this.callPlayerJoinListeners();
    });
  }

  addPlayerJoinListener(callback: (count: number) => void) {
    this.playerJoinListeners.push(callback);
  }

  callPlayerJoinListeners() {
    this.state.counter++;
    this.playerJoinListeners.forEach(c => c(this.state.counter));
  }

  updateRounds(roundId: string) {
    const previousRound = this.state.currentRound;
    this.state.previousRound = previousRound;
    this.state.currentRound = roundId;
    if (this.state.gameId) {
      const updates: any = {
        [`${pathToGame(this.state.gameId)}/previousRound`]: previousRound,
        [`${pathToGame(this.state.gameId)}/currentRound`]: roundId
      };

      return updates;
    }
    return {};
  }

  listenForCurrentRoundIdChange(gameId: string) {
    this.db.ref(pathToGameCurrentRound(gameId)).on("value", (snap: any) => {
      const newRoundId = snap.val();
      this.callCurrentRoundListeners(newRoundId);
    });
  }
  addCurrentRoundListener(callback: (roundId: string) => void) {
    this.currentRoundListeners.push(callback);
  }

  callCurrentRoundListeners(roundId: string) {
    this.state.previousRound = this.state.currentRound;
    this.state.currentRound = roundId;
    this.currentRoundListeners.forEach(c => c(roundId));
  }
}

export default Game;
