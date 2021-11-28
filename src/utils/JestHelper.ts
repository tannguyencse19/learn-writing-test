import { screen, Matcher, within } from "@testing-library/react";

export function expectTextNullOrNot(text: Matcher, isNot: Boolean = true) {
  return !isNot
    ? expect(screen.queryByText(text)).toBeNull()
    : expect(screen.queryByText(text)).not.toBeNull();
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

export function mockFunction<T extends (...args: any[]) => any>(
  fn: T | undefined
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}
