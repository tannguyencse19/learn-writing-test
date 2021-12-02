import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";

export function renderThenPickElement() {
  render(<Todo />);
  const inputField = screen.getByPlaceholderText(/e.g: Do laundry at 6 am/i);
  const btnAdd = screen.getByRole("button", { name: /add/i });
  const taskView = screen.getByTestId("to-do list");

  return [inputField, btnAdd, taskView];
}

export function addTask(
  inputField: HTMLElement,
  btnAdd: HTMLElement,
  value: string
) {
  fireEvent.change(inputField, { target: { value: value } });
  fireEvent.click(btnAdd);
}

export function modifyTask(
  currentTask: string,
  modifyContent: string,
  isNotCancel: boolean = true
) {
  const btnModify = screen.getByRole("button", { name: /modify/i });
  fireEvent.click(btnModify);
  const inputModifyField = screen.getByDisplayValue(currentTask);
  fireEvent.change(inputModifyField, { target: { value: modifyContent } });

  if (isNotCancel) {
    const btnSave = screen.getByRole("button", { name: /save/i });
    fireEvent.click(btnSave);
  } else {
    const btnCancel = screen.getByRole("button", { name: /cancel/i });
    fireEvent.click(btnCancel);
  }

  return [inputModifyField]; // for further testing
}

