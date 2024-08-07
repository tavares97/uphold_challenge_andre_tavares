import { act, fireEvent, render, screen } from "@testing-library/react";

import AmountInput from "../components/InputAmount";
import userEvent from "@testing-library/user-event";

// Mock lodash debounce function
jest.mock("lodash", () => ({
  debounce: (fn: Function) => fn,
}));

describe("AmountInput", () => {
  const mockOnAmountChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with the correct placeholder", () => {
    render(
      <AmountInput initialAmount="" onAmountChange={mockOnAmountChange} />,
    );
    const input = screen.getByPlaceholderText("0.00");
    expect(input).toBeInTheDocument();
  });

  it("displays the provided amount", () => {
    render(
      <AmountInput initialAmount="10.50" onAmountChange={mockOnAmountChange} />,
    );
    const input = screen.getByDisplayValue("10.50");
    expect(input).toBeInTheDocument();
  });

  it("calls onAmountChange when the input value changes", async () => {
    render(
      <AmountInput initialAmount="" onAmountChange={mockOnAmountChange} />,
    );
    const input = screen.getByPlaceholderText("0.00");

    await act(async () => {
      await userEvent.type(input, "15.75");
    });

    expect(mockOnAmountChange).toHaveBeenCalledWith("15.75");
  });

  it("has the correct CSS classes", () => {
    render(
      <AmountInput initialAmount="" onAmountChange={mockOnAmountChange} />,
    );
    const input = screen.getByPlaceholderText("0.00");
    expect(input).toHaveClass(
      "flex-grow",
      "text-4xl",
      "bg-transparent",
      "border-none",
      "focus:outline-none",
      "bg-slate-200",
      "placeholder-slate-500",
      "px-3",
      "py-2",
      "rounded-lg",
    );
  });

  it("debounces the onAmountChange call", async () => {
    jest.useFakeTimers();
    render(
      <AmountInput initialAmount="" onAmountChange={mockOnAmountChange} />,
    );
    const input = screen.getByPlaceholderText("0.00");

    fireEvent.change(input, { target: { value: "20.00" } });

    // Fast-forward timers
    jest.runAllTimers();

    expect(mockOnAmountChange).toHaveBeenCalledWith("20.00");
    expect(mockOnAmountChange).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
