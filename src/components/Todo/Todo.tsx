import React from "react";
import { clickHandlerType, propsTypeOfTodo } from "../../utils/Model";

const Todo = (props: propsTypeOfTodo) => {
  const { handleAddTask } = props;

  const [TaskInput, setTaskInput] = React.useState<string>("");
  const taskInputRef =
    React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const [TaskCounter, setTaskCounter] = React.useState<number>(0);
  const [TaskList, setTaskList] = React.useState<Array<string>>([]);

  function handleInputTask(e: React.ChangeEvent<HTMLInputElement>) {
    setTaskInput(e.target.value);
  }

  function handleAddTaskLocal() {
    if (TaskInput.length > 0) {
      setTaskList((prevState) => [...prevState, TaskInput]);
      setTaskCounter(TaskCounter + 1);
      taskInputRef.current.value = "";
    }
  }

  return (
    <>
      <input
        type="text"
        name="task-input-text"
        id="task-input-text"
        placeholder="e.g: Do laundry at 6pm"
        onChange={handleInputTask}
        ref={taskInputRef}
      />
      <button name="task-btn-add" onClick={handleAddTaskLocal}>
        Add
      </button>
      <ul>
        To-do List
        {TaskList.map((taskName, idx) => (
          <li key={`task-${idx}`}>{taskName}</li>
        ))}
      </ul>
      <p>Task counter: {TaskCounter}</p>
    </>
  );
};

export default Todo;
