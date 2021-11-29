type Callback = Function;
type ListCallback = Callback[];

interface IApp {
  listen: (PORT: number, cb: Callback) => void;

  use: (listcallback: ListCallback) => IApp;

  all: (route: string, ...listcallback: ListCallback) => IApp;
  get: (route: string, ...listcallback: ListCallback) => IApp;
  post: (route: string, ...listcallback: ListCallback) => IApp;
  put: (route: string, ...listcallback: ListCallback) => IApp;
  patch: (route: string, ...listcallback: ListCallback) => IApp;
  delete: (route: string, ...listcallback: ListCallback) => IApp;
  option: (route: string, ...listcallback: ListCallback) => IApp;
}

export type { Callback, IApp, ListCallback };
