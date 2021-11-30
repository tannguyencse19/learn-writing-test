import React from "react";
import { clickHandlerType, propsTypeOfTodo } from "../../utils/Model";

const Todo = (props: propsTypeOfTodo) => {
  // const { handleAddTask } = props;

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

  const handleModifyTaskLocal = React.useCallback(
    (currentTask: string, newContent: string) => {
      setTaskList((prevState) => {
        prevState[prevState.indexOf(currentTask)] = newContent;
        return [...prevState];
      });
    },
    []
  );

  const ListProps = {
    TaskList: TaskList,
    handleDeleteTask: handleDeleteTaskLocal,
    handleModifyTask: handleModifyTaskLocal,
  };

  return (
    // https://stackoverflow.com/questions/67930922/testing-library-react-clicking-outside-of-component-not-working
    <div data-testid="todo-wrapper">
      <input
        type="text"
        name="task-input-add"
        id="task-input-add"
        placeholder="e.g: Do laundry at 6pm"
        onChange={handleInputTask}
        ref={taskInputRef}
      />

      <button name="task-btn-add" onClick={handleAddTaskLocal}>
        Add
      </button>

      <List {...ListProps} />
      <p>Task counter: {TaskCounter}</p>
    </div>
  );
};

interface propsTypeOfListHandler {
  handleDeleteTask: (taskName: string) => void;
  handleModifyTask: (currentTask: string, newContent: string) => void;
}

interface propsTypeOfList extends propsTypeOfListHandler {
  TaskList: Array<string>;
}

const List = React.memo((props: propsTypeOfList) => {
  const { TaskList, handleDeleteTask, handleModifyTask } = props;
  const ListItemProps = {
    handleDeleteTask: handleDeleteTask,
    handleModifyTask: handleModifyTask,
  };

  return (
    <ul data-testid="task-list">
      To-do List
      {TaskList.map((taskName, idx) => (
        <ListItem key={`task-${idx}`} taskName={taskName} {...ListItemProps} />
      ))}
    </ul>
  );
});

interface propsTypeOfListItem extends propsTypeOfListHandler {
  taskName: string;
}

const ListItem = React.memo((props: propsTypeOfListItem) => {
  const { taskName, handleDeleteTask, handleModifyTask } = props;
  const [IsModify, setIsModify] = React.useState(false);
  const [ModifyContent, setModifyContent] = React.useState("");
  const wrapperRef = React.useRef<any>();

  React.useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // console.log("You clicked outside of me!");
        setIsModify(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Unbind the event listener on clean up
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <li ref={wrapperRef}>
      {IsModify ? (
        <>
          <input
            type="text"
            name="task-input-modify"
            id="task-input-modify"
            data-testid="task-input-modify"
            defaultValue={taskName}
            onFocus={() => setModifyContent(taskName)}
            autoFocus
            onChange={({ target: { value } }) => setModifyContent(value)}
            // ref={taskInputRef}
          />

          <button
            name="task-btn-save"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              handleModifyTask(taskName, ModifyContent);
              setModifyContent("");
              setIsModify(false);
            }}
          >
            Save
          </button>

          <button
            name="task-btn-cancel"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              setModifyContent("");
              setIsModify(false);
            }}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <span>{taskName}</span>
          <button
            name="task-btn-delete"
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeleteTask(taskName)}
          >
            Delete
          </button>

          <button
            name="task-btn-modify"
            style={{ marginLeft: "10px" }}
            // onClick={() => handleModifyTask(taskName)}
            onClick={(e) => {
              e.preventDefault();
              setIsModify(true);
            }}
          >
            Modify
          </button>
        </>
      )}
    </li>
  );
});

export default Todo;
