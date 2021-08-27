export class User {
    id: number;
    username: any;
    phone:string;
    email: any;
    password:any;
    role: roleTypes
}

export type roleTypes = "Administrator" | "Teacher" | "User";

export const roles = {
    Administrator: "Administrator" as roleTypes,
    Teacher: "Teacher" as roleTypes,
    User: "User" as roleTypes
};