import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Child from "./components/Child/Child";
import { sleepAwait } from "./utils/Helper";

function App() {
  const [SumLogic, setSumLogic] = React.useState<number>(0);
  const [SideEffectMsg, setSideEffectMsg] = React.useState<string>(
    "There is nothing to update"
  );
  const firstRender = React.useRef<boolean>(true);

  function increment(): void {
    setSumLogic((prevState) => prevState + 1);
  }

  function decrement(): void {
    setSumLogic((prevState) => prevState - 1);
  }

  async function sleep(ms: number) {
    await sleepAwait(ms);
  }

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      sleep(2000);
      setSideEffectMsg(`SumLogic updated: ${SumLogic}`);
    }
  }, [SumLogic]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Child sum={SumLogic} sideEffectMsg={SideEffectMsg} />
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
      </header>
    </div>
  );
}

export default App;
