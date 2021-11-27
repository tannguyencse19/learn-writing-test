import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { expectTextIsInDoc } from "./utils/JestHelper";

describe("first render", () => {
  it("render sum text", () => {
    render(<App />);
    expectTextIsInDoc(/Sum: 0/i);
    expectTextIsInDoc(/SumLogic updated/i, false);
    expectTextIsInDoc(/There is nothing to update/i);
  });
});

describe("integration test", () => {
  it("increment/decrement sum", () => {
    render(<App />);
    const incrementBtn = screen.getByRole("button", { name: /\+/i });
    const decrementBtn = screen.getByRole("button", { name: /-/i });
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expectTextIsInDoc(/Sum: 2/i);
    fireEvent.click(decrementBtn);
    expectTextIsInDoc(/Sum: 1/i);
  });
});
