import {
  act,
  waitFor,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import Signup from "./Signup";
import { config } from "../../config/firebase";
import firebase from "@firebase/app";

afterEach(cleanup);

const email = "cronos.seymour@gmail.com";
const password = "123456";

describe("SignupForm", () => {
  it("renders necessary fields", () => {
    render(<Signup />);

    expect(
      screen.getByRole("heading", { name: "Sign up" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("textbox", { name: /Email Address/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/Retype/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Sign up/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", { name: /Already have/i })
    ).toBeInTheDocument();
  });

  it("should reject different passwords", async () => {
    render(<Signup />);

    fireEvent.input(screen.getByRole("textbox", { name: /Email Address/i }), {
      target: { value: email },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.input(screen.getByLabelText(/Retype/i), {
      target: { value: "123123" },
    });

    await act(async () =>
      fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }))
    );

    expect(screen.getByLabelText(/Retype/i)).toBeInvalid();
  });

  it("should reject passwords that are too short", async () => {
    render(<Signup />);

    fireEvent.input(screen.getByRole("textbox", { name: /Email Address/i }), {
      target: { value: email },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: "11" },
    });

    fireEvent.input(screen.getByLabelText(/Retype/i), {
      target: { value: "11" },
    });

    await act(async () =>
      fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }))
    );

    expect(screen.getByLabelText(/Password/i)).toBeInvalid();
  });

  it("should submit correct form data", async () => {
    const mockSubmit = jest.fn();
    await act(async () => render(<Signup test={mockSubmit} />));
    fireEvent.input(screen.getByRole("textbox", { name: /Email Address/i }), {
      target: { value: email },
    });

    fireEvent.input(screen.getByLabelText(/Password/i), {
      target: { value: password },
    });

    fireEvent.input(screen.getByLabelText(/Retype/i), {
      target: { value: password },
    });

    await act(async () =>
      fireEvent.submit(screen.getByRole("button", { name: /Sign up/i }))
    );

    await waitFor(() =>
      expect(mockSubmit).toHaveBeenCalledWith({
        Email: email,
        Password: password,
        PwdCheck: password,
      })
    );
  });
});
