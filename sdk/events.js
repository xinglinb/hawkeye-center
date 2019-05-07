class Events {
  constructor() {
    this.handlers = {};
  }
  on(event, handler) {
    this.handlers[event] = this.handlers[event] || [];
    this.handlers[event].push(handler);
    return this.handlers[event];
  }
  off(event) {
    if (this.handlers[event]) {
      delete this.handlers[event];
    }
  }
  trigger(event, args) {
    const arg = args || [];
    const funcs = this.handlers[event];
    if (funcs) {
      return funcs.every((f) => {
        const ret = f.apply(this, arg);
        return ret !== false;
      });
    }
    return true;
  }
}

export default Events;
