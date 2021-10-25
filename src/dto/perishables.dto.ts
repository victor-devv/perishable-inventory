export interface CreatePerishableDTO {
    name: string;
    quantity: number;
    expiry: number;
}

export interface SellPerishableDTO {
    name: string;
    quantity: number;
}


// export type PerishableInput = Omit<CreatePerishableDTO, 'id'>;