function debounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  delay: number,
  immediate?: boolean
) {
  let timer: any;

  return function (...args: Parameters<Fn>) {
    const context = this;
    if (immediate && !timer) {
      fn.apply(context, args);
      return;
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}
