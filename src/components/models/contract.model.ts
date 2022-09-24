import { AcceptanceStatus } from "../enums/contract.enum";

export class ContractModel  { //contract details
    _id?: string;
    student?: string;
    advisor?: string;
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
    panel?: string;
    marks?: {
        admin?: Number,
        advisor?: Number
    }
}