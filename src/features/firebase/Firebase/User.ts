type State =
  | {
      signedIn: false;
    }
  | {
      signedIn: true;
      userId: string;
      displayName: string;
    };

type Auth = any;

type Constructor = { initState: State; fireAuth: Auth };

type SignUp = { email: string; password: string; displayName: string };
type Login = { email: string; password: string };

class User {
  auth: Auth;
  state: State;
  signedInListeners: Array<(signedIn: boolean) => void>;
  constructor({ initState, fireAuth }: Constructor) {
    this.auth = fireAuth;
    this.state = initState;
    this.signedInListeners = [];
  }

  async login({ email, password }: Login) {
    try {
      await this.auth.signInWithEmailAndPassword(email, password);
      this.state = {
        signedIn: true,
        userId: this.auth.currentUser.uid,
        displayName: "Tim"
      };

      this.callSignedInListeners(true);
    } catch (e) {}
  }

  async signUp({ email, password, displayName }: SignUp) {
    console.log("signing up");
    try {
      await this.auth.createUserWithEmailAndPassword(email, password);

      this.callSignedInListeners(true);
    } catch (e) {}
  }

  addSignedInListener(callback: (signedIn: boolean) => void) {
    this.signedInListeners.push(callback);

    callback(this.state.signedIn);
  }

  callSignedInListeners(signedIn: boolean) {
    this.signedInListeners.forEach(c => c(signedIn));
  }
}

export default User;
