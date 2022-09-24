import { UserRoles } from "../enums/roles.enum";

export class StudentModel {
    _id?: string;
    name?: string;
    email?: string;
    ID?: string | null;
    role?: UserRoles.STUDENT
}