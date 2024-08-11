export function CheckStatus(
  expectedStatus: "started" | "stopped",
  errorMessage: string
) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = function (this: any, ...args: any[]) {
      if (this.status !== expectedStatus) {
        throw new Error(errorMessage);
      }
      return originalMethod.apply(this, args);
    };
    return descriptor;
  };
}
