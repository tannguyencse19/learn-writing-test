import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expectTextNullOrNot } from "./utils/JestHelper";

describe("first render", () => {
  it("render sum text", () => {
    render(<App />);
    expectTextNullOrNot(/Sum: 0/i);
    expectTextNullOrNot(/SumLogic updated/i, false);
    expectTextNullOrNot(/There is nothing to update/i);
  });
});

describe("integration test", () => {
  it("increment/decrement sum", () => {
    render(<App />);
    const incrementBtn = screen.getByRole("button", { name: /\+/i });
    const decrementBtn = screen.getByRole("button", { name: /-/i });
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expectTextNullOrNot(/Sum: 2/i);
    fireEvent.click(decrementBtn);
    expectTextNullOrNot(/Sum: 1/i);
  });
});
