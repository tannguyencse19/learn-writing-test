import React, { MutableRefObject } from "react";

const Todo = () => {
  const [TaskList, setTaskList] = React.useState<string[]>([]);
  const [Input, setInput] = React.useState("");
  const inputRef = React.useRef() as MutableRefObject<HTMLInputElement>;
  const [Error, setError] = React.useState({
    modify_duplicate: false,
    add_duplicate: false,
  });

  const handleBtnAdd = () => {
    if (Input.length > 0) {
      if (!TaskList.some((task) => task === Input)) {
        setTaskList((prevState) => [...prevState, Input]);
        setError((prevState) => {
          return { ...prevState, add_duplicate: false };
        });
      } else {
        setError((prevState) => {
          return { ...prevState, add_duplicate: true };
        });
      }
      setInput("");
      inputRef.current.value = "";
    }
  };

  const handleBtnDelete = (taskName: string) => {
    setTaskList((prevState) => prevState.filter((task) => task !== taskName));
  };

  const handleBtnSave = (currentTask: string, modifyContent: string) => {
    if (modifyContent.length > 0) {
      if (!TaskList.some((task) => task === modifyContent)) {
        setTaskList((prevState) => {
          prevState[prevState.indexOf(currentTask)] = modifyContent;
          return [...prevState];
        });
        setError((prevState) => {
          return { ...prevState, modify_duplicate: false };
        });
      } else {
        setError((prevState) => {
          return { ...prevState, modify_duplicate: true };
        });
      }
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="e.g: Do laundry at 6 am"
        onChange={({ target: { value } }) => setInput(value)}
        ref={inputRef}
      />
      <button onClick={handleBtnAdd}>Add</button>
      {Error.add_duplicate && <p>Error: Add duplicate task!</p>}
      {Error.modify_duplicate && <p>Error: Modify duplicate task!</p>}

      <ul data-testid="to-do list">
        To-do list
        {TaskList &&
          TaskList.map((task, idx) => (
            <ListItem
              key={`task-${idx}`}
              task={task}
              handleBtnSave={handleBtnSave}
              handleBtnDelete={handleBtnDelete}
            />
          ))}
      </ul>
    </>
  );
};

interface HandlerProps {
  handleBtnSave: (currentTask: string, modifyContent: string) => void;
  handleBtnDelete: (taskName: string) => void;
}
interface ListItemProps extends HandlerProps {
  task: string;
}

const ListItem = React.memo(
  ({ task, handleBtnSave, handleBtnDelete }: ListItemProps) => {
    const [InputModify, setInputModify] = React.useState("");
    const [IsModify, setIsModify] = React.useState(false);

    return (
      <li data-testid={task}>
        {IsModify ? (
          <>
            <input
              type="text"
              defaultValue={task}
              onChange={({ target: { value } }) => setInputModify(value)}
            />
            <button
              onClick={() => {
                handleBtnSave(task, InputModify);
                setInputModify("");
                setIsModify(false);
              }}
            >
              Save
            </button>
            <button
              onClick={() => {
                setInputModify("");
                setIsModify(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <span>{task}</span>
            <button onClick={() => handleBtnDelete(task)}>Delete</button>
            <button
              onClick={() => {
                setInputModify(task);
                setIsModify(true);
              }}
            >
              Modify
            </button>
          </>
        )}
      </li>
    );
  }
);

export default Todo;
