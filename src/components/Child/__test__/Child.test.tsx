import { render, screen } from "@testing-library/react";
import { testByTextInDoc } from "../../../utils/JestHelper";
import Child from "../Child";

describe("first render", () => {
  it("sum render", () => {
    render(<Child />);
    // expect(screen.getByRole("heading", { level: 2 })).toContainHTML('<h2>0</h2>');
    // expect(screen.getByLabelText('display-sum')).toEqual(0)
    testByTextInDoc(/Sum: 0/i);
  });
});