import Todo from "../Todo";
import TestRenderer from "react-test-renderer";

describe("----------Component render------------", () => {
  it("render", () => {
    const DOM = TestRenderer.create(<Todo />).toJSON();
    expect(DOM).toMatchSnapshot();
  });
});
