import React from "react";
import renderer from "react-test-renderer";
import Login from "./Login";
import { AuthProvider } from "../../context/AuthContext";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AuthProvider>
        <Login />
      </AuthProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
