import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Login from "../pages/pageLogin";

afterEach(cleanup);

const email = "cronos.seymour@gmail.com";
const password = "123456";

describe("LoginForm", () => {
  it("renders necessary fields", () => {
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

  it("should submit correct form data", async () => {
    const mockSubmit = jest.fn();
    render(<Login testFn={mockSubmit} />);
    fireEvent.input(screen.getByRole("textbox", { name: /Email Address/i }), {
      target: { value: email },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Sign in/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      Email: email,
      password: password,
    });
  });
});
