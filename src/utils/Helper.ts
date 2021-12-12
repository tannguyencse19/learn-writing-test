export function sleepAwait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms)); // Type cua res, setTimeOut la inferred by TypeScript
}

// chua lam duoc require key: number
// https://www.typescriptlang.org/docs/handbook/type-compatibility.html#optional-parameters-and-rest-parameters
export function loop(
  callback: (key: number, ...params: any[]) => any,
  times: number
) {
  [...Array(times)].map((_, idx) => callback(idx));
}

export function logFnDefinition(fn: any) {
  return console.log(fn.toString());
}
