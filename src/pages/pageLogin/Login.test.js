import {
  act,
  waitFor,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import React from "react";
import Login from "./Login";
import { AuthProvider } from "../../context/AuthContext";
afterEach(cleanup);

const email = "cronos.seymour@gmail.com";
const password = "123456";

describe("LoginForm", () => {
  /* it("renders necessary fields", async () => {
    await act(async () =>
      render(
        <AuthProvider>
          <Login />
        </AuthProvider>
      )
    );

    expect(
      screen.getByRole("heading", { name: "Sign in" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /Email Address/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Sign in/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Forgot Password?/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Don't have/i })
    ).toBeInTheDocument();
  }); */

  it("should submit correct form data", async () => {
    const mockLogin = jest.fn();
    const a = React.createContext();
    jest.mock("../../context/AuthContext", () => {
      return {
        useAuth: jest.fn(),
        AuthProvider: jest.fn().mockImplementation(() => {
          return { login: mockLogin };
        }),
      };
    });
    await act(async () =>
      render(
        <AuthProvider>
          <Login />
        </AuthProvider>
      )
    );

    fireEvent.input(screen.getByRole("textbox", { name: /Email Address/i }), {
      target: { value: email },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });
    await act(async () => {
      fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));
    });

    await waitFor(() =>
      expect(mockLogin).toHaveBeenCalledWith(email, password)
    );
  });
});
