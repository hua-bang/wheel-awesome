interface Middleware<Arg extends any[] = any[]> {
  (
    next: () => void,
    ...args: Arg
  ): void;
}

const runMiddlewares = <Arg extends any[] = any[]>(
  middleWares: Array<Middleware<Arg>>,
  ...args: Arg
) => {
  let index = 0;
  const next = () => {
    if(index < middleWares.length) {
      const middleware = middleWares[index];
      index++
      middleware(next, ...args);      
    }
  }

  next();
}

interface Obj {
  count: number;
}

const obj = {
  count: 1,
};

const middleWares: Array<Middleware<[Obj]>> = [
  (next, obj) => {
    console.log('middleWare1', obj.count);
    next();
    console.log('middleWare1', obj.count);
  },
  (next, obj) => {
    console.log('middleWare2', obj.count);
    obj.count++;
    next();
    console.log('middleWare2', obj.count);
  },
];

runMiddlewares(middleWares, obj);