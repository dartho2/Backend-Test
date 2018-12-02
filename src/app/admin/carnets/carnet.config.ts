export interface KarnetPortal {
    _id: string;
    portal_id: string;
    viewName: string;
  }
  export interface Karnet {
    type: string;
    name: string;
    value: string;
    options: Options[]
  }
  export interface Options {
    type: string;
    name: string;
    value: string;
    package: Package[];
  }
  export interface Package {
    type: string;
    name: string;
    value: string;
  }
