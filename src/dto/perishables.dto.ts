export interface CreatePerishableDTO {
    name: string;
    quantity: number;
    expiry: number;
}


// export type PerishableInput = Omit<CreatePerishableDTO, 'id'>;