import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { propsTypeOfTodo } from "../../../utils/Model";

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