import React from "react";
import renderer from "react-test-renderer";
import Signup from "./Signup";
import { AuthProvider } from "../../context/AuthContext";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AuthProvider>
        <Signup />
      </AuthProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
