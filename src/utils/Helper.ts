export function sleepAwait(ms: number) {
  return new Promise<void>((res) => setTimeout(res, ms)); // Type cua res, setTimeOut la inferred by TypeScript
}
