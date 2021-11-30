/* eslint-disable @typescript-eslint/no-unused-vars */

// function GenericArray<T>(arr: Array<T>) {
//   return [...arr];
// }

const GenericArray = <T, Y>(arr: (T | Y)[]) => {
  return [...arr];
};

const mixTypeArr = GenericArray([1, "2"]);

const makeFullName = <T, objType extends { first_name: T; last_name: T }>(
  obj: objType
) => ({
  ...obj,
  full_name: `${obj.first_name} ${obj.last_name}`,
});

let my_name = { first_name: "tan", last_name: 123, age: 28 };
my_name = makeFullName(my_name);
console.log(my_name);


