import { cleanup, render, screen } from "@testing-library/react";
import Login from "../pages/pageLogin";

afterEach(cleanup);

describe("LoginForm", () => {
  it("renders necessary fields", () => {
    const email = "cronos.seymour@gmail.com";
    const password = "123456";
    render(<Login />);

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
  });
});
