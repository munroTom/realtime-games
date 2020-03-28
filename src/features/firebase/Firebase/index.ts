import app from "firebase/app";
import "firebase/database";

import config from "config.json";

class Firebase {
  db: any;
  constructor() {
    app.initializeApp(config.firebaseConfig);

    this.db = app.database();
  }

  round(roundId: string) {
    const round = this.db.ref(`rounds/${roundId}`);

    console.log(round);

    return round;
  }

  dealCards(roundId: string, deck: any) {
    this.db.ref(`rounds/${roundId}/cards`).set(deck);
  }

  doSomething() {
    console.log("something");
  }
}

export default Firebase;
