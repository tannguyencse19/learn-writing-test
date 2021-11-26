import React from "react";

import { propsTypeOfChild as propsType } from "../../utils/Model";

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/default_props/#you-may-not-need-defaultprops
const Child = (props: propsType) => {
  const { sum = 0, sideEffectMsg = undefined } = props;
  const [UpdateMsg, setUpdateMsg] = React.useState<string>(
    "There is nothing to update"
  );
  const firstRender = React.useRef<boolean>(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      setUpdateMsg(`Notice sumProp changed: ${sum}`);
    }
  }, [sum]);

  return (
    <>
      <h2 aria-label="display-sum">Sum: {sum}</h2>
      {/*
        Co ke thu tu
        Trong truong hop ca 2 cung co thi uu tien sideEffectMsg
      */}
      <p>{sideEffectMsg || UpdateMsg}</p>
    </>
  );
};

export default Child;
