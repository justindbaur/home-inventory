


export interface Item {
    barcodeNum: string,
    name: string
}

export enum Status {
    Init,
    Loading,
    Complete,
    Error
}

interface ServiceInit {
    status: Status.Init;
}

interface ServiceLoading {
    status: Status.Loading;
}

interface ServiceComplete<T> {
    status: Status.Complete;
    payload: T
}

interface ServiceError {
    status: Status.Error;
    error: Error;
}

export type Service<T> = 
    | ServiceInit
    | ServiceLoading
    | ServiceComplete<T>
    | ServiceError