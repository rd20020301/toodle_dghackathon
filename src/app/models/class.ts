export class Class {
    id: number;
    class: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
