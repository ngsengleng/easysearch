import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "../../pages/pageHome";
import History from "../../pages/pageHistory";
import Wishlist from "../../pages/pageWishlist";

export default function UserAuth() {
  return (
    <Switch>
      <Route path="/history">
        <History />
      </Route>
      <Route path="/wishlist">
        <Wishlist />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
}
