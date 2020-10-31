export interface Part {
    company: string,
    id: string,
    description: string,
    typeCode: string
}

export interface User {
    username: string,
    name: string
}

export interface PartTran {
    company: string,
    partId: string,
    adjustQuantity: number
}