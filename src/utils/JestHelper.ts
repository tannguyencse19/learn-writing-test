import { screen, Matcher } from "@testing-library/react";

export function expectTextIsInDoc(
  regex: Matcher,
  visible: Boolean = true
): void {
  return !visible
    ? expect(screen.queryByText(regex)).not.toBeInTheDocument()
    : expect(screen.queryByText(regex)).toBeInTheDocument();
}

export function mockFunction<T extends (...args: any[]) => any>(
  fn: T | undefined
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}
