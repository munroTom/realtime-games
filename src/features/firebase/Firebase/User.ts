type State = {
  signedIn: boolean;
  userId: string | null;
  displayName: string | null;
};

type Auth = any;

type Constructor = { initState: State; fireAuth: Auth; db: any };

type SignUp = { email: string; password: string; displayName: string };
type Login = { email: string; password: string };

class User {
  auth: Auth;
  db: any;
  state: State;
  signedInListeners: Array<(signedIn: boolean) => void>;
  constructor({ initState, fireAuth, db }: Constructor) {
    this.auth = fireAuth;
    this.state = initState;
    this.signedInListeners = [];
    this.db = db;
  }

  getState() {
    return this.state;
  }

  async login({ email, password }: Login) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      const userId = this.auth.currentUser.uid;
      const userDb = await this.db.ref(`users/${userId}`).once("value");

      const { displayName } = userDb.val();
      this.state = {
        signedIn: true,
        userId,
        displayName
      };

      console.log(this.state);

      this.callSignedInListeners();
      return "";
    } catch (e) {
      return e.message;
    }
  }

  async signUp({ email, password, displayName }: SignUp) {
    if (!displayName) {
      return "You need to set a display name";
    }
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);
      const userId = this.auth.currentUser.uid;
      await this.db.ref(`users/${userId}`).set({ displayName });

      this.state = {
        signedIn: true,
        userId,
        displayName
      };

      this.callSignedInListeners();

      return "";
    } catch (e) {
      return e.message;
    }
  }

  async logout() {
    await this.auth.signOut();
    this.state = {
      signedIn: false,
      userId: null,
      displayName: null
    };

    this.callSignedInListeners();
  }

  addSignedInListener(callback: (signedIn: boolean) => void) {
    this.signedInListeners.push(callback);

    callback(this.state.signedIn);
  }

  callSignedInListeners() {
    const signedIn = this.getState().signedIn;
    this.signedInListeners.forEach(c => c(signedIn));
  }
}

export default User;
