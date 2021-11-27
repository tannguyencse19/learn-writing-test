import { screen } from "@testing-library/react";

export function testByTextInDoc(regex: RegExp): void {
  expect(screen.queryByText(regex)).toBeInTheDocument();
}

export function testByTextIsAppear(regex: RegExp, appear: Boolean): void {
  if (!appear) {
    expect(screen.queryByText(regex)).toBeNull();
  } else {
    expect(screen.queryByText(regex)).not.toBeNull();
  }
}

export function mockFunction<T extends (...args: any[]) => any>(
  fn: T | undefined
): jest.MockedFunction<T> {
  return fn as jest.MockedFunction<T>;
}