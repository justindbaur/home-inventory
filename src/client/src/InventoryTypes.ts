export interface FormState<T> { 
    status: FormStatus, 
    payload?: T, 
    error?: Error
}

export enum FormStatus {
    Error = 'error',
    Loading = 'loading',
    Loaded = 'loaded'
}

export interface Item {
    barcodeNum: string,
    name: string,
    quantity: number,
    location: string,
    size: number,
    uom: string
}