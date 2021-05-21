import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";


export default function App() {
    
    const [token, setToken] = useState();

    if (!token) {
        return (
            <Router>
                <Switch>
                    <Route path="/signup">
                        <Signup />
                    </Route>

                    <Route path="/">
                        <Login setToken={setToken} />
                    </Route>
                </Switch>
            </Router>
        )
    }
    
    return (
        <Router>
            <Switch>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}