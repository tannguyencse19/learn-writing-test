import { render, screen, fireEvent } from "@testing-library/react";

function getByRoleBtn(btnName: string): HTMLButtonElement {
  return screen.getByRole("button", { name: btnName }) as HTMLButtonElement;
}

function expectBtnInDocument(btn: HTMLElement) {
  return expect(btn).toBeInTheDocument();
}

describe("Integration test - first render", () => {
  render(<Todo />);

  const AddBtn = getByRoleBtn("Add");
  const RemoveBtn = getByRoleBtn("Remove");
  const ModifyBtn = getByRoleBtn("Modify");

  it("render input", () => {
    expect(screen.getByRole("input")).toBeInTheDocument();
  });

  it("render CRUD button", () => {
    expectBtnInDocument(AddBtn);
    expect(RemoveBtn).not.toBeInTheDocument();
    expectBtnInDocument(ModifyBtn);
  });

  it("render TaskView component", () => {
    expect(
      screen.getAllByRole("listitem", { name: "Tasks" })
    ).toBeInTheDocument(); // name Tasks ko on, can chi bao khac

    expect(screen.getByText(/Number of task: 0/i)).toBeInTheDocument();
  });
});

describe("Integration test - CRUD action", () => {
  render(<Todo />);

  const inputEl = screen.getByRole("input") as HTMLInputElement;
  const addBtn = getByRoleBtn("Add");
  const removeBtn = getByRoleBtn("Remove");
  const modifyBtn = getByRoleBtn("Modify");
  const taskView = screen.getAllByRole("listitem", { name: "Tasks" });
  const taskCounter = screen.getByText(/Number of task/i);

  describe("add button", () => {
    let counter = 0;

    function expectAfterAdd(): void {
      expect(taskView).toHaveLength(counter);
      expect(taskView).toContain(`Task #${counter}`);
      expect(taskCounter).toHaveTextContent(`Number of task: ${counter}`);
    }

    it("add 5 task", () => {
      function add(): void {
        counter++;
        fireEvent.change(inputEl, { target: { value: `Task #${counter}` } });
        fireEvent.click(addBtn);

        expectAfterAdd();
      }

      add();
      add();
      add();
      add();
      add();
    });

    it("add empty task => taskCounter should not increase", () => {
      fireEvent.click(addBtn);

      expectAfterAdd();
    });
  });

  describe("remove button", () => {
    let counter = 0;

    function add(): void {
      counter++;
      fireEvent.change(inputEl, { target: { value: `Task #${counter}` } });
      fireEvent.click(addBtn);

      expectAfterAdd();
    }

    function expectAfterAdd(): void {
      expect(taskView).toHaveLength(counter);
      expect(taskView).toContain(`Task #${counter}`);
      expect(taskCounter).toHaveTextContent(`Number of task: ${counter}`);
    }

    function remove(taskId: number): void {
      const removeBtn = screen.getByTestId(`task-${taskId}-remove-btn`);
      fireEvent.click(removeBtn);
      counter--;

      expectAfterRemove(taskId);
    }

    function expectAfterRemove(taskId: number): void {
      expect(taskView).toHaveLength(counter);
      expect(taskView).not.toContain(`Task #${taskId}`);
      expect(taskCounter).toHaveTextContent(`Number of task: ${counter}`);
    }

    it("remove task just create", () => {
      add(); // Task 1
      remove(1);
    });

    it("add 5 task, then remove 4 task", () => {
      [1, 2, 3, 4, 5].forEach(() => add());
      [1, 3, 4, 5].forEach((taskId) => remove(taskId));
    });
  });

  it("other CRUD with empty task => taskCounter should not increase", () => {
    fireEvent.click(removeBtn);
    fireEvent.click(modifyBtn);
  });
});
