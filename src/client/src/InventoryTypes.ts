export interface Part {
    id: string,
    description: string,
    typeCode: string
}

export interface User {
    username: string,
    name: string
}

export interface PartTran {
    partId: string,
    adjustQuantity: number
}