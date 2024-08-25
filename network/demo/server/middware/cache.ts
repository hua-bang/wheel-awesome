import { IRouterHandler } from "express";

export const CacheMiddleware: IRouterHandler<any> = (
  req: any,
  res: any,
  next: any
) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
};
