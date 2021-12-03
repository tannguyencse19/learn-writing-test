import { render, screen, fireEvent } from "@testing-library/react";
import { loop } from "../../../utils/Helper";
import {
  expectElementContainText,
  expectListTagHaveLength,
} from "../../../utils/JestHelper";
import Todo from "../Todo";
import { addTask, modifyTask, renderThenPickElement } from "./TestHelper";

/* TODO: Todo.test.tsx
  - Click outside instead of cancel
*/

/* DOING: Todo.test.tsx
 */

/* DONE: Todo.test.tsx
  - Render task input field
  - Render task btn add
  - Render task view (display)
  - Add 1 task
  - Accept add empty input
  - Render btn modify, delete after add 1 task
  - Delete 1 task
  - Modify 1 task
    - Render Btn save
    - Btn save functionality
  - Render Btn cancel
  - Btn cancel functionality
  - Modify but input modify is empty => Save but keep original task
    - Modify save value
  - Add 2 task, then modify but only 1 task show input field, btn modify, btn save
  - Modify 2 task 1 after 1
  - No duplicate task show
    - Duplicate when add
    - Duplicate when modify

  - Integration Test
    - Add 100 task, then delete
*/

describe("----------Render------------", () => {
  it(`Render all element
  Input: none
  Output: Display all element`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();
    expect(inputField).toBeInTheDocument();
    expect(btnAdd).toBeInTheDocument();
    expect(taskView).toBeInTheDocument();

    addTask(inputField, btnAdd, "sample task");

    const btnModify = screen.getByRole("button", { name: /modify/i });
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(btnModify).toBeInTheDocument();

    fireEvent.click(btnModify);
    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it(`Press Modify (after add 2 task no duplicate), but only modify 1 task
  Input: None
  Output: Display input field, btn save, btn cancel for only 1 task`, () => {
    const [inputField, btnAdd] = renderThenPickElement();
    addTask(inputField, btnAdd, "first task");
    addTask(inputField, btnAdd, "second task");

    fireEvent.click(screen.getAllByRole("button", { name: /modify/i })[0]);
    expect(screen.getByDisplayValue("first task")).toBeInTheDocument();
    expect(screen.queryByDisplayValue("second task")).not.toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /save/i })).not.toHaveLength(
      2
    );
    expect(screen.getAllByRole("button", { name: /cancel/i })).not.toHaveLength(
      2
    );
  });
});

describe("----------Function: Add------------", () => {
  it(`Add 1 task
  Input: True
  Output: Display task`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "sample task");
    expectElementContainText(taskView, "sample task");
  });

  it(`Add empty task
  Input: None
  Output: Not display empty task`, () => {
    const [, btnAdd, taskView] = renderThenPickElement();

    fireEvent.click(btnAdd);
    expectListTagHaveLength(taskView, 0);
  });

  it(`Add 2 duplicate task
  Input: True
  Output: Display only 1 task + Throw error`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "duplicated");
    addTask(inputField, btnAdd, "duplicated");

    expectListTagHaveLength(taskView, 2, false);
    expect(screen.getByText(/error: add duplicate/i)).toBeInTheDocument();
  });
});

it(`Delete 1 task (after add that task)
  Output: Task disappear`, () => {
  const [inputField, btnAdd, taskView] = renderThenPickElement();

  addTask(inputField, btnAdd, "sample task");

  const btnDelete = screen.getByRole("button", { name: /delete/i });
  fireEvent.click(btnDelete);
  expectElementContainText(taskView, "sample task", false);
  expectListTagHaveLength(taskView, 0);
});

describe("----------Function: Modify, Save, Cancel------------", () => {
  it(`Modify 1 task then Save (after add that task)
  Input: True
  Output: Display modified value`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "sample task");

    modifyTask("sample task", "modified");
    expectElementContainText(taskView, "modified");
  });

  it(`Modify 1 task then Save
  Input: Empty string
  Output: Not display modified`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "sample task");

    modifyTask("sample task", "");
    expectElementContainText(taskView, "sample task");
  });

  it(`Modify but Cancel
  Input: True
  Output: Not display modified`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "sample task");

    const [inputModifyField] = modifyTask("sample task", "modified", false);
    expectElementContainText(taskView, "modified", false);
    expect(inputModifyField).not.toBeInTheDocument();
  });

  it(`Modify 2 task 1 after 1
  Input: True
  Output: Display modified value for each task`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "first task");
    addTask(inputField, btnAdd, "second task");

    modifyTask("first task", "modified first task");
    modifyTask("second task", "modified second task");
    expectElementContainText(taskView, "modified first task");
    expectElementContainText(taskView, "modified second task");
  });

  it(`Modify task to exist task (duplicate)
  Input: True
  Output: Not modify, display original + Display error`, () => {
    const [inputField, btnAdd, taskView] = renderThenPickElement();

    addTask(inputField, btnAdd, "not duplicated");
    addTask(inputField, btnAdd, "duplicated");

    modifyTask("not duplicated", "duplicated");
    expectElementContainText(taskView, "not duplicated");
    expect(screen.getByText(/error: modify duplicate/i)).toBeInTheDocument();
  });
});

describe("----------Integration Test------------", () => {
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
