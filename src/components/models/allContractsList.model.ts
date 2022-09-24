import { AcceptanceStatus } from "../enums/contract.enum";

export class AllContractsModel  { // list of requests
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
    advisorForm?: {
        _id?: string
    };
    acceptance?: AcceptanceStatus;
    isClosed?: Boolean;
    inPanel?: Boolean;
    panel?: String;
}