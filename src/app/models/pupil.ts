export class Student {
    constructor(
        public id: number,
        public pupil: InfoUser,
        public username: string,
        public classname: ClassName,
        public password: string
    ) { }
}

export class ClassName {
    public id: number;
    public class: string;
}

export class InfoUser {
    public id: number;
    public fullname: string;
}