import { UserRoles } from "../enums/roles.enum";

export class PanelListModel {
    _id?: string;
    name?: string;
    email?: string;
    department?: string | null;
    role?: UserRoles.ADVISOR | UserRoles.PANEL;
}