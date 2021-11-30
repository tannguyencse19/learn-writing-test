import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { propsTypeOfTodo } from "../../../utils/Model";
import {
  expectElementContainText,
  fireEventChangeInputTag,
} from "../../../utils/JestHelper";

export function componentRender(props?: propsTypeOfTodo) {
  // Gom lai de sau nay khoi suy nghi, moi test phai viet <Todo />

  return render(<Todo {...props} />);
}

export function renderThenPickElement(): HTMLElement[] {
  // Chi goi 1 lan thoi

  componentRender();
  const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);
  const listTask = screen.getByTestId("task-list");
  const btnAdd = screen.getByRole("button", { name: /add/i });
  const taskCounter = screen.getByText(/Task counter/i);

  return [inputTask, listTask, btnAdd, taskCounter];
}

export function addTask(
  inputTask: HTMLElement,
  btnAdd: HTMLElement,
  taskContent: string
) {
  fireEvent.change(inputTask, { target: { value: taskContent } });
  fireEvent.click(btnAdd);
}

export function modifyTask(
  listTask: HTMLElement,
  taskContent: string,
  isNotCancle: boolean = true
) {
  const btnModify = screen.getByRole("button", { name: /modify/i });
  fireEvent.click(btnModify);

  if (taskContent.length > 0) {
    const inputModify = screen.getByTestId("task-input-modify");
    fireEventChangeInputTag(inputModify, taskContent);
  }

  if (isNotCancle) {
    const btnSave = screen.getByRole("button", { name: /save/i });
    fireEvent.click(btnSave);
  } else {
    const btnCancel = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(btnCancel);
  }
}

export function testValidator(el: HTMLElement) {
  expect(el).toBe(null);
}
