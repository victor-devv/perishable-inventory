export interface CRUD {
    get: (name: string) => Promise<any>;
    create: (resource: any) => Promise<any>;
    sell: (resource: any) => Promise<any>;
}