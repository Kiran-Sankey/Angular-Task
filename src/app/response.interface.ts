export interface ResponseData {
    supplierinfo: SupplierInfo[];
    approv: Approval[];
}

export interface SupplierInfo {
    id: string;
    companyName: string;
    companyAddress: string;
    contactName: string;
    email: string;
    vendorcode: string;
    statecountry: string;
    telno: string;
    faxno: string;
    src: string;
}

export interface Approval {
    id: string;
    type: string;
    status: string;
    date: string;
}