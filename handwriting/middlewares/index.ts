interface Middleware<Params extends any[] = []> {
  (next: () => void, ...args: Params): void;
}

const runMiddlewares = <Params extends any[] = []>(
  middlewares: Middleware<Params>[],
  ...args: Params
) => {
  let index = 0;
  const next = () => {
    if (index >= middlewares.length) {
      return;
    }

    const middleware = middlewares[index++];
    middleware(next, ...args);
  };

  next();
};

interface ExpressRequest {
  name: string;
}

type ExpressMiddleware = Middleware<[ExpressRequest]>;

const middlewares: ExpressMiddleware[] = [
  (next, req) => {
    console.log("middleware 1 start: ", req.name);
    next();
    console.log("middleware 1 end: ", req.name);
  },
  (next, req) => {
    console.log("middleware 2 start: ", req.name);
    next();
    req.name = "hujiahua";
    console.log("middleware 2 end: ", req.name);
  },
  (next, req) => {
    console.log("middleware 3 start: ", req.name);
    next();
    console.log("middleware 3 end: ", req.name);
  },
];

runMiddlewares(middlewares, {
  name: "huahua",
});
