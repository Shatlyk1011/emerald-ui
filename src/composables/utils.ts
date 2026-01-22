export function debounce<T>(func: (...args: T[]) => void, delay: number) {
  let timeoutId: undefined | ReturnType<typeof setTimeout>;

  return function (...args: T[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      // @ts-expect-error valid
      func.apply(this, args);
    }, delay);
  };
}
