const add = (a: any, b: any) => a + b;

it(`First test
  Input: what
  Output: what`, () => {
  let addMock = jest.fn(add);
  expect(addMock(1, 2)).toBe(3);
  expect(addMock(5, 6)).toBe(11);

  console.log(addMock.mock);
});
