import React, { MutableRefObject } from "react";
import ListItem from "./ListItem";

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
              item={task}
              handleBtnSave={handleBtnSave}
              handleBtnDelete={handleBtnDelete}
            />
          ))}
      </ul>
    </>
  );
};

export interface HandlerProps {
  handleBtnSave: (currentTask: string, modifyContent: string) => void;
  handleBtnDelete: (taskName: string) => void;
}

// eslint-disable-next-line import/first
import * as math from './math';

export const doAdd      = (a: any, b: any) => math.add(a, b);
export const doSubtract = (a: any, b: any) => math.subtract(a, b);
export const doMultiply = (a: any, b: any) => math.multiply(a, b);
export const doDivide   = (a: any, b: any) => math.divide(a, b);

export default Todo;
