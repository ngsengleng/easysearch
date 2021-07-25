import React from "react";
import renderer from "react-test-renderer";
import ForgetPassword from "./ForgetPassword";
import { AuthProvider } from "../../context/AuthContext";
it("renders correctly", () => {
  const tree = renderer
    .create(
      <AuthProvider>
        <ForgetPassword />
      </AuthProvider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
