export function sleepAwait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms)); // Type cua res, setTimeOut la inferred by TypeScript
}

// chua lam duoc require key: number
export function loop(
  times: number,
  fnToDo: (key: number, ...params: any[]) => any
) {
  [...Array(times)].map((_, idx) => fnToDo(idx));
}
