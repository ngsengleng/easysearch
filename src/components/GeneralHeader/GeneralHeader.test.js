import { screen, render, cleanup } from "@testing-library/react";
import GeneralHeader from "./GeneralHeader";

afterEach(cleanup);
describe("testHeader", () => {
  it("should render correct headers", () => {
    render(<GeneralHeader />);

    expect(screen.getByText(/image/i)).toBeInTheDocument();
    expect(screen.getByText(/item/i)).toBeInTheDocument();
    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/price/i)).toBeInTheDocument();
    expect(screen.getByText(/store/i)).toBeInTheDocument();
    expect(screen.getByText(/rating/i)).toBeInTheDocument();
    expect(screen.getByText(/wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/link to site/i)).toBeInTheDocument();
  });
});
