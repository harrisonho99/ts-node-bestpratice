type Task = Function;
type EventName = string | symbol;
type EventMap = { [eventName: EventName]: Task[] };

class MEventEmitter {
  private eventMap: EventMap = {};

  emit(eventName: EventName, data?: any) {
    const eventCbs = this.eventMap[eventName];
    if (typeof eventCbs !== 'undefined') {
      eventCbs.forEach((cb) => cb(data));
    }
  }

  on(eventName: EventName, cb: Task) {
    const eventCbs = this.eventMap[eventName];
    if (typeof eventCbs !== 'undefined' && eventCbs instanceof Array) {
      eventCbs.push(cb);
    } else {
      this.eventMap[eventName] = [cb];
    }
  }
  removeAllListeners(eventName: EventName): boolean {
    const eventCbs = this.eventMap[eventName];
    if (typeof eventCbs !== 'undefined') {
      return false;
    }
    return delete this.eventMap[eventName];
  }
}

export { MEventEmitter };
