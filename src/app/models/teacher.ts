export class Teacher {
    constructor(
        public id: number,
        public teacher: Info,
        public school_id: number,
        public username: string,
        public subject: Subject,
        public password: string
    ) { }
}

export class Subject{
    public id: number;
    public name: string;
}

export class Info {
    public id: number;
    public fullname: string;
}