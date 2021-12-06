import React from "react";
import { HandlerProps } from "./Todo";

export interface ListItemProps extends HandlerProps {
  item: string;
}

const ListItem = React.memo(
  ({ item, handleBtnSave, handleBtnDelete }: ListItemProps) => {
    const [InputModify, setInputModify] = React.useState("");
    const [IsModify, setIsModify] = React.useState(false);

    return (
      <li data-testid={item}>
        {IsModify ? (
          <>
            <input
              type="text"
              defaultValue={item}
              onChange={({ target: { value } }) => setInputModify(value)}
            />
            <button
              onClick={() => {
                handleBtnSave(item, InputModify);
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
            <span>{item}</span>
            <button onClick={() => handleBtnDelete(item)}>Delete</button>
            <button
              onClick={() => {
                setInputModify(item);
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

export default ListItem;