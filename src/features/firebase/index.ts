import { useContext } from "react";

import FirebaseContext from "./context";
import Firebase from "./Firebase";

const useFirebase = () => useContext(FirebaseContext) as Firebase;

export { Firebase, FirebaseContext, useFirebase };
