abstract class Runnable<
  RunInput extends any = any,
  RunOutput extends any = any
> {
  name: string = "";

  abstract invoke(runInput: RunInput): RunOutput;

  pipe<NewRunOutput>(
    runnable: Runnable<RunOutput, NewRunOutput>
  ): Runnable<RunInput, NewRunOutput> {
    const that = this;

    class PipedRunnable extends Runnable<RunInput, NewRunOutput> {
      name: string = `${that.name} -> ${runnable.name}`;

      invoke(runInput: RunInput): NewRunOutput {
        const output = that.invoke(runInput);
        return runnable.invoke(output);
      }
    }

    const pipedRunnable = new PipedRunnable();

    return pipedRunnable;
  }
}

class A extends Runnable<string, string[]> {
  name: string = "A";

  invoke(runInput: string): string[] {
    return [runInput];
  }
}

class B extends Runnable<string[], string> {
  name: string = "B";

  invoke(runInput: string[]): string {
    return runInput[0];
  }
}

const a = new A();
const b = new B();
const c = a.pipe(b);
console.log("res", c.invoke("9"));
