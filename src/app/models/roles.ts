import { roleSessionNameType } from "aws-sdk/clients/sts";

export class Roles { 
    /**
     * name.
     */    
    name?: roleTypes;
}

export type roleTypes = "Administrator" | "Teacher" | "User";

export const roles = {
    Administrator: "Administrator" as roleTypes,
    Teacher: "Teacher" as roleTypes,
    User: "User" as roleTypes
};