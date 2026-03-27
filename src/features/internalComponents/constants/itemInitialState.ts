import { ComponentType } from "../types/component.type"
import { Invoice } from "../types/invoice.type"

export const ITEMS_INITIAL_STATE: ComponentType = {
    id: "",
    series: "",
    price: 0,
    refInvoice: {},
    requirementId: "",
    eqId: "",
    pvId: "",
    status: "",
    addedBy: "",
    addedAt: new Date()
}