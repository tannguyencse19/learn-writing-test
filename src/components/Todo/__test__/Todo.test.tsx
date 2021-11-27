import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { propsTypeOfTodo } from "../../../utils/Model";
import { expectTextIsInDoc, mockFunction } from "../../../utils/JestHelper";

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
  const btnAdd = screen.getByRole("button", { name: /add/i });

  return [inputTask, btnAdd];
}

/*
 * Testing start here
 */

describe("----------Task Input Text---------", () => {
  it("render_inputTaskNone_outputDisplayNone", () => {
    const [inputTask] = renderThenPickElement();

    expect(inputTask).toBeInTheDocument();
  });

  it("typing_inputTaskString_outputDisplayString", () => {
    // Gia su la chap nhan moi loai character
    const [inputTask] = renderThenPickElement();
    const taskSample = "this is a sample task";

    fireEvent.change(inputTask, { target: { value: taskSample } });
    expect(inputTask).toHaveValue(taskSample);
  });
});

describe("----------Task Button Add------------", () => {
  it("render_inputTaskNone_outputDisplayNone", () => {
    const [btnAdd] = renderThenPickElement();

    expect(btnAdd).toBeInTheDocument();
  });

  // it("pressing_inputTaskNone_outputDisplayNone_expectHandlerToBeCallOneTime", () => {
  //   const mockHandleAddTask = mockFunction(() => {})
  //   componentRender({handleAddTask: mockHandleAddTask});
  //   const [btnAdd] = renderThenPickElement();

  //   fireEvent.click(btnAdd);
  //   expect(mockHandleAddTask).toHaveBeenCalledTimes(1);
  //   expectTextIsInDoc(/Task counter: 1/i, false);
  // });

  it("pressing_inputTaskTrue_outputDisplayTaskJustAdded", () => {
    const [inputTask, btnAdd] = renderThenPickElement();
    const taskSample = "First task";

    fireEvent.change(inputTask, { target: { value: taskSample } });
    expect(inputTask).toHaveValue(taskSample);

    fireEvent.click(btnAdd);
    expectTextIsInDoc(taskSample);
    expectTextIsInDoc(/Task counter: 1/i);
    expect(inputTask).toHaveValue("");
  });
});
