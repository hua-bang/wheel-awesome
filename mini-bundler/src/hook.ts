class Hook {
  private callbacks: Array<() => void> = [];

  tap(pluginName: string, callback: () => void) {
    this.callbacks.push(callback);
  }

  call() {
    this.callbacks.forEach(callback => callback());
  }
};

export default Hook;