class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);

    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

export const globalEvents = new EventEmitter();

export const EVENT_TYPES = {
  API_UNAUTHORIZED: "API_UNAUTHORIZED",
  NETWORK_OFFLINE: "NETWORK_OFFLINE",
  NETWORK_ONLINE: "NETWORK_ONLINE",
  API_FORBIDDEN: "API_FORBIDDEN",
  API_ERROR: "API_ERROR",
};
