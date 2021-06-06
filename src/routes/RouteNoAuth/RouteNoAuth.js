import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Signup from "../../pages/pageSignup";
import Login from "../../pages/pageLogin";
import Construction from "../../pages/pageUnderConstruction";
export default function NoAuth() {
  return (
    <Router>
      <Switch>
        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/forget">
          <Construction />
        </Route>

        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
