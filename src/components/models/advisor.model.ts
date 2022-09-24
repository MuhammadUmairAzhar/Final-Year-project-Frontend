import { UserRoles } from "../enums/roles.enum";

export class AdvisorModel {
    _id?: string;
    name?: string;
    email?: string;
    department?: string | null;
    role?: UserRoles.ADVISOR
}