function throttle(fn: Function, delay: number, immediate?: boolean) {
  let timer: any;

  return function(...args: any[]) {
    if (timer) {
      return;
    }

    const context = this;
    if (immediate) {
      fn.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
        timer = null;
      }, delay);
    }
    
  }
}
