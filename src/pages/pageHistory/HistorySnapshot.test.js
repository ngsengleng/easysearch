import React from "react";
import renderer from "react-test-renderer";
import History from "./History";
import { AuthProvider } from "../../context/AuthContext";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AuthProvider>
        <History />
      </AuthProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
