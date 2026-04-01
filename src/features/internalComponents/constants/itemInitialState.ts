import { ComponentType } from "../types/component.type"
import { INVOICE_INITIAL_STATE } from "./invoiceInitialState"

export const ITEMS_INITIAL_STATE: ComponentType = {
    id: "",
    series: "",
    price: 0,
    refInvoice: INVOICE_INITIAL_STATE,
    requirementId: "",
    eqId: "",
    pvId: "",
    status: "",
    addedBy: "",
    addedAt: new Date()
}