export interface Carnet {
    _id: string;
    name: string;
    surname: string;
    type: [{
        name: string;
        options: string;
        package: {
            name: string;
            time:string;
            amount: [boolean];
            value: number;
        },
        sdata: string;
        edata: string;
    }]
};
