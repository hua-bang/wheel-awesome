function debounce<Fn extends (...args) => void>(
  fn: Fn,
  delay: number,
  immediate?: boolean
) {
  let timer: any;
  let invoked = false;

  return function (...args: Parameters<Fn>) {
    const context = this;

    if (immediate && !invoked) {
      fn.apply(context, args);
      invoked = true;
      setTimeout(() => {
        invoked = false;
      });

      return;
    }

    if(timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn.call(context, ...args);
      timer = null;
    }, delay);
  }
}