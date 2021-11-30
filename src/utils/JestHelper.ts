import { screen, Matcher, within, fireEvent } from "@testing-library/react";

export function expectTextNullOrNot(text: Matcher, isNull: Boolean = false) {
  return isNull
    ? expect(screen.queryByText(text)).toBeNull()
    : expect(screen.queryByText(text)).not.toBeNull();
}

export function expectInputTagHaveValue(
  inputTag: HTMLElement,
  value: string | number | string[] | null | undefined,
  isNotVisible: boolean = false
) {
  return isNotVisible
    ? expect(inputTag).not.toHaveValue(value)
    : expect(inputTag).toHaveValue(value);
}

export function expectElementContainText(
  el: HTMLElement,
  text: string | RegExp,
  isVisible: boolean = true
) {
  return !isVisible
    ? expect(el).not.toHaveTextContent(text as RegExp)
    : expect(el).toHaveTextContent(text as RegExp);
}

export function expectListTagHaveLength(
  listTag: HTMLElement,
  length: number,
  isNotEqual: boolean = false
) {
  const { queryAllByRole } = within(listTag);
  const items = queryAllByRole("listitem");

  return isNotEqual
    ? expect(items).not.toHaveLength(length)
    : expect(items).toHaveLength(length);
}

// Chua lam duoc
// export function expectListTagContainChild(
//   listTag: HTMLElement,
//   childText: string,
//   isNotContain: boolean = false
// ) {
//   const { queryAllByRole } = within(listTag);
//   const items = queryAllByRole("listitem");

//   // return isNotContain
//   //   ? expect(items).not.toContainElement(screen.getByText(childText))
//   //   : expect(items).toContainElement(screen.getByText(childText));
//   console.log(
//     items.forEach((item) => {
//       return expectElementContainText(item, childText);
//     })
//   );
// }

export function fireEventChangeInputTag(inputTag: HTMLElement, value: string) {
  return fireEvent.change(inputTag, { target: { value: value } });
}

export function mockFunction<mockFnType extends (...args: any[]) => any>(
  fn: mockFnType | undefined
) {
  return fn as jest.MockedFunction<mockFnType>;
}
