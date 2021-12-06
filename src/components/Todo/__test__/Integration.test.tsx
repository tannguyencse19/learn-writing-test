import { screen, fireEvent } from "@testing-library/react";
import {
  expectElementContainText,
  expectListTagHaveLength,
} from "../../../utils/JestHelper";
import { addTask, renderThenPickElement } from "./TestHelper";

describe.skip("----------Integration Test------------", () => {
  it(`Add 100 (nonduplicate) tasks, then delete
    Input: True
    Output: Display none task`, () => {
    const times = 100;
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    [...Array(times)].map((_, idx) =>
      addTask(inputField, btnAdd, `Task #${idx}`)
    );

    const btnDelete = screen.getAllByRole(`button`, { name: /delete/i });
    [...Array(times)].map(() => fireEvent.click(btnDelete[0]));

    expectListTagHaveLength(taskView, 0);
    expectElementContainText(taskView, /task/i, false);
  });
});
