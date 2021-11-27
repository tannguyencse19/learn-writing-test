import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../Todo";
import { propsTypeOfTodo } from "../../../utils/Model";
import { mockFunction } from "../../../utils/JestHelper";

// Gom lai de sau nay khoi suy nghi, moi test phai viet <Todo />
function componentRender(props?: propsTypeOfTodo) {
  return render(<Todo {...props} />);
}

function elementPicker(): HTMLElement[] {
  componentRender();
  const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);
  const btnAdd = screen.getByRole("button", { name: /add/i });

  return [inputTask, btnAdd];
}

describe("----------Task Input Text---------", () => {
  it("render_inputNone_outputDisplayNone", () => {
    componentRender();
    const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);

    expect(inputTask).toBeInTheDocument();
  });

  it("typing_inputText_outputDisplayText", () => {
    componentRender();
    const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);
    const inputText = "this is a sample text";

    fireEvent.change(inputTask, { target: { value: inputText } });
    expect(inputTask).toHaveValue(inputText);
  });
});

describe("----------Task Button Add------------", () => {
  it("render_inputTaskNone_outputDisplayNone", () => {
    componentRender();
    const btnAdd = screen.getByRole("button", { name: /add/i });

    expect(btnAdd).toBeInTheDocument();
  });

  // it("pressing_inputTaskNone_outputDisplayNone", () => {
  //   const mockHandleClick = jest.fn();
  //   componentRender({ handleClick: mockHandleClick });
  //   const btnAdd = screen.getByRole("button", { name: /add/i });

  //   fireEvent.click(btnAdd);
  //   expect(mockHandleClick).toHaveBeenCalledTimes(1);
  //   expect(screen.queryByText(/Task counter: 1/i)).not.toBeInTheDocument();
  // });

  it("pressing_inputTaskTrue_outputDisplayTaskJustAdded", () => {
    componentRender();
    const btnAdd = screen.getByRole("button", { name: /add/i });
    const inputTask = screen.getByPlaceholderText(/e.g: Do laundry at 6pm/i);
    const inputText = "First task";

    fireEvent.change(inputTask, { target: { value: inputText } });
    expect(inputTask).toHaveValue(inputText);

    fireEvent.click(btnAdd);
    expect(screen.queryByText(inputText)).toBeInTheDocument();
    expect(screen.queryByText(/Task counter: 1/i)).toBeInTheDocument();
    expect(inputTask).toHaveValue("");
  });
});
