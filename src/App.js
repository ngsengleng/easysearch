import React from "react";
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

import ForgetPassword from "./pages/pageForgetPassword";
import Home from "./pages/pageHome";
import History from "./pages/pageHistory";
import Login from "./pages/pageLogin";
import Signup from "./pages/pageSignup";
import Trending from "./pages/pageTrending";
import Wishlist from "./pages/pageWishlist";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

export default function App() {
  return (
    <div>
      <Router>
        <FirebaseAuthProvider {...config} firebase={firebase}>
          <AppShell />
          <FirebaseAuthConsumer>
            <IfFirebaseAuthed>
              <Switch>
                <Route path="/history">
                  <History />
                </Route>

                <Route path="/wishlist">
                  <Wishlist />
                </Route>

                <Route path="/trending">
                  <Trending />
                </Route>

                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/forget">
                  <Redirect to="/" />
                </Route>
              </Switch>
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
              <Switch>
                <Route path="/signup">
                  <Signup />
                </Route>

                <Route path="/forget">
                  <ForgetPassword />
                </Route>

                <Route exact path="/">
                  <Login />
                </Route>
              </Switch>
            </IfFirebaseUnAuthed>
          </FirebaseAuthConsumer>
        </FirebaseAuthProvider>
      </Router>
    </div>
  );
}
