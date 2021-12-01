import { render, screen } from "@testing-library/react";
import Todo from "../Todo";

/* TODO: List
    - Add 1 task
*/

/* DOING: List
  - Render task view (display)
*/

/* DONE: List
    - Render task input field
  - Render task btn add
*/

it(`Render all element
  Input: none
  Output: Display all element`, () => {
  render(<Todo />);
  expect(
    screen.getByPlaceholderText(/e.g: Do laundry at 6 am/i)
  ).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  expect(
    screen.getAllByRole("listitem", { name: /to-do list/i })
  ).toBeInTheDocument();
});

describe("----------Task Input Field------------", () => {});
