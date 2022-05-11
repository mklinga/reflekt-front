export default function debounce(callback: (...args: unknown[]) => unknown, delay: number) {
  let intervalId: number = null;
  return function debouncedFunction(...args: unknown[]) {
    if (intervalId) {
      clearTimeout(intervalId);
    }
    intervalId = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}
