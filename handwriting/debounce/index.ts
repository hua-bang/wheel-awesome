function debounce<Fn extends (...args: any[]) => any>(fn: Fn, delay: number) {
  let timer: any;

  return function (...args: Parameters<Fn>) {
    timer && clearTimeout(timer);
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}
