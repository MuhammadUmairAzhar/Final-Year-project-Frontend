import { AcceptanceStatus } from "../enums/contract.enum";
import { PanelPopulatedModel } from "./panelPopulated.model";

export class ContractPopulatedModel  { //contract details populated
    _id?: string;
    student?: {
        _id?: string;
        name?: string;
        ID?: string;
    };
    advisor?: {
        _id?: string;
        name?: string;
        department?: string;
    };
    project?: {
        name?: string,
        description?: string
    };
    studentOne?: {
        name?: string,
        ID?: string,
    };
    studentTwo?: {
        name?: string,
        ID?: string,
    };
    acceptance?: AcceptanceStatus;
    isClosed?: Boolean;
    advisorForm?: {
        advisorName?: string;
        designation?: string;
        department?: string;
        qualification?: string;
        specialization?: string;
        contact?: string;
        email?: string;
        semester?: number;
        year?: number;
        program?: string;
        creditHours?: number;
        compensation?: number;
        project?: {
            name?: string;
            description?: string;
        };
        tools?: {
            hardware?: string;
            software?: string;
        };
        cost?: number;
        studentOne?: {
            name?: string;
            ID?: string;
        };
        studentTwo?: {
            name?: string;
            ID?: string;
        };
        referenceNo?: string;
    };
    panel?: PanelPopulatedModel;
    marks?: {
        admin?: Number,
        advisor?: Number
        mid?: any[],
        final?: any[]
    };
    user?: {
        mid?: number,
        final?: number,
    }
}