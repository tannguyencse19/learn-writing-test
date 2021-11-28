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
      if (!TaskList.some((el) => el === TaskInput)) {
        setTaskList((prevState) => [...prevState, TaskInput]);
        setTaskCounter((prevState) => prevState + 1);
        setTaskInput("");
        taskInputRef.current.value = "";
      }
    }
  }

  const handleDeleteTaskLocal = React.useCallback((currentTask: string) => {
    setTaskList((prevState) =>
      prevState.filter((task) => task !== currentTask)
    );
    setTaskCounter((prevState) => prevState - 1);
  }, []);

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

      <List TaskList={TaskList} handleDeleteTask={handleDeleteTaskLocal} />
      <p>Task counter: {TaskCounter}</p>
    </>
  );
};

interface propsTypeOfList {
  TaskList: Array<string>;
  handleDeleteTask: (taskName: string) => void;
}

const List = React.memo((props: propsTypeOfList) => {
  const { TaskList, handleDeleteTask } = props;

  return (
    <ul data-testid="task-list">
      To-do List
      {TaskList.map((taskName, idx) => (
        <ListItem
          key={`task-${idx}`}
          taskName={taskName}
          handleDeleteTask={handleDeleteTask}
        />
      ))}
    </ul>
  );
});

interface propsTypeOfListItem {
  taskName: string;
  handleDeleteTask: (taskName: string) => void;
}

const ListItem = React.memo((props: propsTypeOfListItem) => {
  const { taskName, handleDeleteTask } = props;

  return (
    <li>
      <span>{taskName}</span>
      <button
        name="task-btn-delete"
        style={{ marginLeft: "10px" }}
        onClick={() => handleDeleteTask(taskName)}
      >
        Delete
      </button>
    </li>
  );
});

export default Todo;
