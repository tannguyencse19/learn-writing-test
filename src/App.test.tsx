import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { testByTextInDoc, testByTextIsAppear } from "./utils/JestHelper";

describe("first render", () => {
  it("render sum text", () => {
    render(<App />);
    testByTextInDoc(/Sum: 0/i);
    testByTextIsAppear(/SumLogic updated/i, false);
    testByTextIsAppear(/There is nothing to update/i, true);
  });
});

describe("integration test", () => {
  it("increment/decrement sum", () => {
    render(<App />);
    const incrementBtn = screen.getByRole("button", { name: /\+/i });
    const decrementBtn = screen.getByRole("button", { name: /-/i });
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    testByTextInDoc(/Sum: 2/i);
    fireEvent.click(decrementBtn);
    testByTextInDoc(/Sum: 1/i);
  });
});
