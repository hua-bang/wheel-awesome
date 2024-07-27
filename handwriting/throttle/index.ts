function throttle(fn: Function, delay: number, immediate?: boolean) {
  let timer: number | null = null;

  return function (...args: any[]) {
    if (timer) {
      return;
    }

    const context = this;

    if (immediate) {
      fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      return;
    } else {
      timer = setTimeout(() => {
        timer = null;
        fn.apply(context, args);
      }, delay);
    }
  };
}
