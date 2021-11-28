import { screen, Matcher, within } from "@testing-library/react";

export function expectTextIsInDoc(text: Matcher, isVisible: Boolean = true) {
  return !isVisible
    ? expect(screen.queryByText(text)).not.toBeInTheDocument()
    : expect(screen.queryByText(text)).toBeInTheDocument();
}

export function expectInputTagHaveValue(
  inputTag: HTMLElement,
  value: string | number | string[] | null | undefined,
  isVisible: boolean = true
) {
  return !isVisible
    ? expect(inputTag).not.toHaveValue(value)
    : expect(inputTag).toHaveValue(value);
}

export function expectElementContainText(
  el: HTMLElement,
  text: string | RegExp,
  isVisible: boolean = true
) {
  return !isVisible
    ? expect(el).not.toHaveTextContent(text)
    : expect(el).toHaveTextContent(text);
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

export function mockFunction<T extends (...args: any[]) => any>(
  fn: T | undefined
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}
