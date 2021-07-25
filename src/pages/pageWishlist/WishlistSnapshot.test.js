import React from "react";
import renderer from "react-test-renderer";
import Wishlist from "./Wishlist";
import { AuthProvider } from "../../context/AuthContext";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AuthProvider>
        <Wishlist />
      </AuthProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
