/* eslint-disable array-callback-return */
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { propsTypeOfTodo } from "../../../utils/Model";
import {
  expectElementContainText,
  expectInputTagHaveValue,
  expectListTagHaveLength,
  expectTextNullOrNot,
} from "../../../utils/JestHelper";
import { loop } from "../../../utils/Helper";

/*
 * Helper function
 */

function componentRender(props?: propsTypeOfTodo) {
  // Gom lai de sau nay khoi suy nghi, moi test phai viet <Todo />

  return render(<Todo {...props} />);
}

function renderThenPickElement(): HTMLElement[] {
  // Chi goi 1 lan thoi

  componentRender();
  const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);
  const listTask = screen.getByTestId("task-list");
  const btnAdd = screen.getByRole("button", { name: /add/i });
  const taskCounter = screen.getByText(/Task counter/i);

  return [inputTask, listTask, btnAdd, taskCounter];
}

function addTask(
  inputTask: HTMLElement,
  btnAdd: HTMLElement,
  taskContent: string
) {
  fireEvent.change(inputTask, { target: { value: taskContent } });
  fireEvent.click(btnAdd);
}

/*
 * Testing start here
 */

describe("----------Task Input Text---------", () => {
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

  describe("pressing_inputTaskEmptyOrTrue_outputDisplayTask", () => {
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

    it("step2_inputEmpty_outputDisplayEmptyTask", () => {
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

  describe("addOneTask_inputTaskEmptyOrTrue", () => {
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

  describe("pressing_outputExpectTaskDisappear", () => {
    it("case1_addOneTask", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

      const taskContent = "Sweep the floor";
      addTask(inputTask, btnAdd, taskContent);

      const btnDelete = screen.getByRole("button", { name: /delete/i });
      fireEvent.click(btnDelete);
      expectTextNullOrNot(taskContent, false);
      expectElementContainText(taskCounter, /Task counter: 0/i);
      expectListTagHaveLength(listTask, 0);
    });

    it("case2_addManyTask_NoDuplicateTask", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

      const taskContent = ["Sweep the floor", "Clean the dish", "Do laundry"];
      taskContent.forEach((task) => addTask(inputTask, btnAdd, task));

      // Chu y: Btn delete chua phan biet nhau
      let btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(3);
      fireEvent.click(btnDelete[1]);
      expectTextNullOrNot(taskContent[1], false);
      expectElementContainText(taskCounter, /Task counter: 2/i);
      expectListTagHaveLength(listTask, 2);

      btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(2);
      fireEvent.click(btnDelete[1]);
      expectTextNullOrNot(taskContent[1], false);
      expectElementContainText(taskCounter, /Task counter: 1/i);
      expectListTagHaveLength(listTask, 1);

      btnDelete = screen.getAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(1);
      fireEvent.click(btnDelete[0]);
      expectTextNullOrNot(taskContent[0], false);
      expectElementContainText(taskCounter, /Task counter: 0/i);
      expectListTagHaveLength(listTask, 0);

      btnDelete = screen.queryAllByRole("button", { name: /delete/i });
      expect(btnDelete).toHaveLength(0);
    });
  });
});

describe("---------Integation Test----------", () => {
  describe("Add then Delete 5 tasks", () => {
    const noOfTasks = 5;

    it("addThenDeleteImmediately_inputTaskTrue_outputDisplayNone", () => {
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

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
      const [inputTask, listTask, btnAdd, taskCounter] =
        renderThenPickElement();

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
});
