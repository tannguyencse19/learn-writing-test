/* eslint-disable array-callback-return */
import { screen, fireEvent } from "@testing-library/react";
import {
  expectElementContainText,
  expectInputTagHaveValue,
  expectListTagHaveLength,
  expectTextNullOrNot,
} from "../../../utils/JestHelper";
import { loop } from "../../../utils/Helper";
import { addTask, renderThenPickElement } from "./TodoHelper";

describe.skip("------Add then Delete 5 tasks--------", () => {
  const noOfTasks = 5;

  it("addThenDeleteImmediately_inputTaskTrue_outputDisplayNone", () => {
    const [inputTask, listTask, btnAdd, taskCounter] = renderThenPickElement();

    function addThenDelete(idx?: number) {
      const taskContent = `Task #${idx}`;
      addTask(inputTask, btnAdd, taskContent);
      const btnDelete = screen.getByRole("button", { name: /delete/i });
      fireEvent.click(btnDelete);
    }
    loop(noOfTasks, addThenDelete);

    expectElementContainText(taskCounter, /Task counter: 0/i);
    expectListTagHaveLength(listTask, 0);
  });

  it("finishAddThenDelete_inputTaskTrue_outputDisplayNone", () => {
    const [inputTask, listTask, btnAdd, taskCounter] = renderThenPickElement();

    function add(idx?: number) {
      const taskContent = `Task #${idx}`;
      addTask(inputTask, btnAdd, taskContent);
    }
    loop(noOfTasks, add);
    expectElementContainText(taskCounter, `Task counter: ${noOfTasks}`);
    expectListTagHaveLength(listTask, noOfTasks);

    function deleteTask() {
      const btnDelete = screen.queryAllByRole("button", { name: /delete/i });
      if (btnDelete[0] !== null) {
        fireEvent.click(btnDelete[0]);
      }
    }
    loop(noOfTasks, deleteTask);

    expectElementContainText(taskCounter, "Task counter: 0");
    expectListTagHaveLength(listTask, 0);
  });
});
