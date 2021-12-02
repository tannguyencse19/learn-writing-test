import { render, screen, fireEvent } from "@testing-library/react";
import {
  expectElementContainText,
  expectListTagHaveLength,
} from "../../../utils/JestHelper";
import Todo from "../Todo";
import { addTask, modifyTask, renderThenPickElement } from "./TestHelper";

/* TODO: Todo.test.tsx
  - Add 2 task, then modify but only 1 task show input field, btn modify, btn save
  - No duplicate task show
    - Duplicate when add
    - Duplicate when modify
  - Add 100 task, then delete
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
*/

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
  Output: Display modified`, () => {
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
});
