import { MouseEventHandler } from "react";

export interface propsTypeOfChild {
  sum?: number;
  sideEffectMsg?: string;
}

export type clickHandlerType = React.MouseEvent<HTMLButtonElement>;
export interface propsTypeOfTodo {
  handleAddTask?: clickHandlerType;
}
