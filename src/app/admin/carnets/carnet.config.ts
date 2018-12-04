export interface KarnetPortal {
    _id: string;
    portal_id: string;
    viewName: string;
  }
  export interface Karnet {
    type: string;
    name: string;
    value: string;
  }
  export interface Options {
    name: string;
    value: string;
  }
  export interface Package {
    name: string;
    value: string;
    amount: Amount;
    time: number;
    stime: number;
  }
  export interface Amount {}
