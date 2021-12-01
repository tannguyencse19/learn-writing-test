/* eslint-disable array-callback-return */
import { screen, fireEvent } from "@testing-library/react";
import {
  expectElementContainText,
  expectInputTagHaveValue,
  expectListTagHaveLength,
  expectTextNullOrNot,
  fireEventChangeInputTag,
} from "../../../utils/JestHelper";
import {
  addTask,
  modifyTask,
  renderThenPickElement,
  testValidator,
} from "./TodoHelper";
//

describe("----------Task Input Add---------", () => {
  it("render_inputTaskEmpty_outputDisplayEmpty", () => {
    const inputTask = renderThenPickElement()[0];

    expect(inputTask).toBeInTheDocument();
  });

  it("typing_inputTaskString_outputDisplayString", () => {
    // Gia su la chap nhan moi loai character
    const [inputTask] = renderThenPickElement();
    const taskContent = "this is a sample task";

    fireEvent.change(inputTask, { target: { value: taskContent } });
    expectInputTagHaveValue(inputTask, taskContent);
  });
});

describe("----------Task Button Add------------", () => {
  it("render_inputTaskEmpty_outputDisplayEmpty", () => {
    const btnAdd = renderThenPickElement()[2];

    expect(btnAdd).toBeInTheDocument();
  });

  // Tam bo qua vi thay kho
  // it("pressing_inputTaskEmpty_outputDisplayEmpty_expectHandlerToBeCallOneTime", () => {
  //   const mockHandleAddTask = mockFunction(() => {})
  //   componentRender({handleAddTask: mockHandleAddTask});
  //   const [btnAdd] = renderThenPickElement();

  //   fireEvent.click(btnAdd);
  //   expect(mockHandleAddTask).toHaveBeenCalledTimes(1);
  // expectElementContainText(taskCounter, "Task counter: 1", false);
  // });

  it("pressing_inputTaskEmpty_outputDisplayEmpty", () => {
    const [inputTask, , btnAdd, taskCounter] = renderThenPickElement();

    fireEvent.click(btnAdd);
    expectElementContainText(taskCounter, /Task counter: 1/i, false);
    expectInputTagHaveValue(inputTask, "");
  });

  describe("------------Add 1 Task-------------", () => {
    it("step1_inputTrue_outputDisplayTaskJustAdded", () => {
      const [inputTask, , btnAdd, taskCounter] = renderThenPickElement();

      const taskContent = "First task";
      fireEvent.change(inputTask, { target: { value: taskContent } });
      expect(inputTask).toHaveValue(taskContent);

      fireEvent.click(btnAdd);
      expectTextNullOrNot(taskContent);
      expectElementContainText(taskCounter, /Task counter: 1/i);
      expectInputTagHaveValue(inputTask, "");
    });

    it("step2_inputEmpty_outputNotDisplayThatTask", () => {
      const [inputTask, , btnAdd, taskCounter] = renderThenPickElement();

      const taskContent = "First task";
      fireEvent.change(inputTask, { target: { value: taskContent } });
      expect(inputTask).toHaveValue(taskContent);

      fireEvent.click(btnAdd);
      expectTextNullOrNot(taskContent);
      expectElementContainText(taskCounter, /Task counter: 1/i);
      expectInputTagHaveValue(inputTask, "");

      fireEvent.click(btnAdd);
      expectElementContainText(taskCounter, /Task counter: 2/i, false);
      expectInputTagHaveValue(inputTask, "");
    });
  });
});

describe("----------Task View-----------", () => {
  it("render_outputDisplayEmpty", () => {
    const [, listTask, , taskCounter] = renderThenPickElement();
    expectElementContainText(listTask, /To-do List/i);
    expectListTagHaveLength(listTask, 0);
    expectElementContainText(taskCounter, /Task counter: 0/i);
  });

  describe("----------Add 1 Task-----------", () => {
    it("case1_inputEmpty_outputDisplayEmpty", () => {
      const [, listTask, btnAdd, taskCounter] = renderThenPickElement();

      // Gia su pass cac test o tren nen ko check inputTask, btnAdd nua => Bien day tro thanh Unit test
      fireEvent.click(btnAdd);

      expectListTagHaveLength(listTask, 0);
      expectElementContainText(taskCounter, /Task counter: 0/i);
    });

    it("case2_inputTrue_outputDisplayTrue", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

      const taskContent = "First task";
      addTask(inputTask, btnAdd, taskContent);

      expectTextNullOrNot(taskContent);
      expectListTagHaveLength(listTask, 1);
      expectElementContainText(taskCounter, /Task counter: 1/i);
    });
  });

  it("addTwoDuplicateTasks_inputTrue_outputDisplayOnlyOne", () => {
    const [inputTask, listTask, btnAdd, taskCounter] = renderThenPickElement();

    const taskContent = "Duplicated";
    addTask(inputTask, btnAdd, taskContent);
    addTask(inputTask, btnAdd, taskContent);

    expectTextNullOrNot(taskContent);
    expectListTagHaveLength(listTask, 2, true);
    expectElementContainText(taskCounter, /Task counter: 1/i);
  });
});

describe("---------Task Button Delete--------", () => {
  it("renderAfterAddTask_outputNone", () => {
    const [inputTask, , btnAdd] = renderThenPickElement();

    // Gia su la cac test tren chay dung het => Day la unit test
    const taskContent = "Sweep the floor";
    addTask(inputTask, btnAdd, taskContent);

    const btnDelete = screen.getByRole("button", { name: /delete/i });
    expect(btnDelete).toBeInTheDocument();
  });

  describe("------------Delete task------------", () => {
    it("case1_deleteOneTask", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

      const taskContent = "Sweep the floor";
      addTask(inputTask, btnAdd, taskContent);

      const btnDelete = screen.getByRole("button", { name: /delete/i });
      fireEvent.click(btnDelete);
      expectTextNullOrNot(taskContent, true);
      expectElementContainText(taskCounter, /Task counter: 0/i);
      expectListTagHaveLength(listTask, 0);
    });

    it("case2_deleteManyTask_NoDuplicateTask", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

      const taskContent = ["Sweep the floor", "Clean the dish", "Do laundry"];
      taskContent.forEach((task) => addTask(inputTask, btnAdd, task));

      // Chu y: Btn delete chua phan biet nhau
      let btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(3);
      fireEvent.click(btnDelete[1]);
      expectTextNullOrNot(taskContent[1], true);
      expectElementContainText(taskCounter, /Task counter: 2/i);
      expectListTagHaveLength(listTask, 2);

      btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(2);
      fireEvent.click(btnDelete[1]);
      expectTextNullOrNot(taskContent[1], true);
      expectElementContainText(taskCounter, /Task counter: 1/i);
      expectListTagHaveLength(listTask, 1);

      btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(1);
      fireEvent.click(btnDelete[0]);
      expectTextNullOrNot(taskContent[0], true);
      expectElementContainText(taskCounter, /Task counter: 0/i);
      expectListTagHaveLength(listTask, 0);

      btnDelete = screen.queryAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(0);
    });
  });
});

describe("----------Task Button Modify------------", () => {
  it("renderAfterAddOneTask_inputNone_outputDisplay", () => {
    const [inputTask, , btnAdd] = renderThenPickElement();
    expect(screen.queryByRole("button", { name: /modify/i })).toBeNull();
    expect(screen.queryByTestId("task-input-modify")).toBeNull();

    const taskContent = "Test for modify";
    addTask(inputTask, btnAdd, taskContent);

    const btnModify = screen.getByRole("button", { name: /modify/i });
    expect(btnModify).toBeInTheDocument();

    fireEvent.click(btnModify);
    const inputModify = screen.getByTestId("task-input-modify");
    expect(inputModify).toBeInTheDocument();
    expectInputTagHaveValue(inputModify, taskContent);

    expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  describe.only("----------Modify------------", () => {
    it("inputTrue_outputDisplayChange_exceptClickCancelOrOutside", () => {
      const [inputTask, listTask, btnAdd] = renderThenPickElement();

      const taskContent = "Test for modify";
      addTask(inputTask, btnAdd, taskContent);

      // Gia su da pass qua test ben tren => Ko test render nua
      let taskContentModified = "Modified #1";
      modifyTask(listTask, taskContentModified);
      expectElementContainText(listTask, taskContentModified);

      // taskContentModified = "Modified #2";
      // const btnModify = screen.getByRole("button", { name: /modify/i });
      // fireEvent.click(btnModify);
      // const inputModify = screen.getByTestId("task-input-modify");
      // fireEventChangeInputTag(inputModify, taskContent);
      // // clickOutside();
      // testValidator(listTask);
      // expectElementContainText(listTask, taskContentModified, false);

      taskContentModified = "Modified #3";
      modifyTask(listTask, taskContentModified, false);
      expectElementContainText(listTask, taskContentModified, false);
    });

    it("inputNone_outputNotDisplayChange", () => {
      const [inputTask, listTask, btnAdd] = renderThenPickElement();

      const taskContent = "Test for modify";
      addTask(inputTask, btnAdd, taskContent);

      modifyTask(listTask, "");
      expectElementContainText(listTask, taskContent);

      // modifyTask(listTask, "");
      // // clickOutside();
      // expectElementContainText(listTask, taskContent);

      modifyTask(listTask, "", false);
      expectElementContainText(listTask, taskContent);
    });
  });
});
