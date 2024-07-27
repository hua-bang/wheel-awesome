function throttle(fn: Function, delay: number) {
  let timer: number | null = null;

  return function (...args: any[]) {
    if (timer) {
      return;
    }
    const context = this;
    timer = setTimeout(() => {
      timer && clearTimeout(timer);
      timer = null;
      fn.apply(context, args);
    }, delay);
  };
}
