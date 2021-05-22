import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home";
import Login from "./pages/pageLogin";
import Signup from "./pages/pageSignup";

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
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}