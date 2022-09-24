import { ContractPopulatedModel } from "./contractPopulated.model";
import { PanelListModel } from "./panelList.model";

export class PanelPopulatedModel {
    _id?: string;
    name?: string;
    members?: PanelListModel[];
    contracts?: ContractPopulatedModel[];
    isClosed?: boolean;
}