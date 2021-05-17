import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

export default function Routes() {
    return (
        <Router>
            <Switch>

                <Route path="/signup">
                    <Signup />
                </Route>

                <Route path="/">
                    <Login />
                </Route>

            </Switch>
        </Router>
    )
}