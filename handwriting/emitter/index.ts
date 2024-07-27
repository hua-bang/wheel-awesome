class EventEmitter {
  private subscribers: Record<string, Array<Function>> = {};

  on(eventName: string, callback: Function) {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }
    this.subscribers[eventName].push(callback);
  }

  off(eventName: string, callback: Function) {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName] = this.subscribers[eventName].filter(
        (cb) => cb !== callback
      );
    }
  }

  emit(eventName: string, ...args: any[]) {
    if (this.subscribers[eventName]) {
      this.subscribers[eventName].forEach((cb) => cb(...args));
    }
  }
}

const emitter = new EventEmitter();

emitter.on("message", (...args: any[]) => {
  console.log("message", args);
});

const handleMessage = (...args: any[]) => {
  console.log("handleMessage", args);
};

emitter.on("message", handleMessage);

emitter.emit("message", "hello", "好呀");

emitter.off("message", handleMessage);

emitter.emit("message", "hello", "好呀");
