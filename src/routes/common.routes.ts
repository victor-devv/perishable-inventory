import {Express, Request, Response} from 'express'

export const register =  (app: Express) => {
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200))

}

export abstract class CommonRoutesConfig {
    app: Express;
    name: string;

    constructor(app: Express, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }
    getName() {
        return this.name;
    }
    abstract configureRoutes(): Express;
}