import { PerformanceObserver } from "perf_hooks";

export const numberFormatter = (number: string | number) => {
  const num = typeof number === "number" ? number : parseFloat(number);
  return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

export const datetimeSorter = (a: string, b: string) =>
  new Date(a) > new Date(b) ? 1 : new Date(a) === new Date(b) ? 0 : -1;
