import React, { MutableRefObject } from "react";

const Todo = () => {
  const [TaskList, setTaskList] = React.useState<string[]>([]);
  const [Input, setInput] = React.useState("");
  const [InputModify, setInputModify] = React.useState("");
  const [IsModify, setIsModify] = React.useState(false);
  const inputRef = React.useRef() as MutableRefObject<HTMLInputElement>;

  const handleBtnAdd = () => {
    if (Input.length > 0) {
      setTaskList((prevState) => [...prevState, Input]);
      setInput("");
      inputRef.current.value = "";
    }
  };

  const handleBtnDelete = (taskName: string) => {
    setTaskList((prevState) => prevState.filter((task) => task !== taskName));
  };

  const handleBtnSave = (currentTask: string, modifyContent: string) => {
    if (modifyContent.length > 0) {
      setTaskList((prevState) => {
        prevState[prevState.indexOf(currentTask)] = modifyContent;
        return [...prevState];
      });
    }
    setIsModify(false);
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
      <ul data-testid="to-do list">
        To-do list
        {TaskList &&
          TaskList.map((task, idx) => (
            <li key={`task-${idx}`}>
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
          ))}
      </ul>
    </>
  );
};

export default Todo;
