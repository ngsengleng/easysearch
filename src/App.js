import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";

import { config } from "./config/firebase";
import firebase from "@firebase/app";
import "@firebase/auth";

import AppShell from "./components/AppShell";
import NoAuth from "./routes/RouteNoAuth";
import UserAuth from "./routes/RouteUserAuth";

import { BrowserRouter } from "react-router-dom";
export default function App() {
  return (
    <div>
      <BrowserRouter>
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <AppShell />
          <FirebaseAuthConsumer>
            <IfFirebaseAuthed>
              <UserAuth />
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
              <NoAuth />
            </IfFirebaseUnAuthed>
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
      </BrowserRouter>
    </div>
  );
}
