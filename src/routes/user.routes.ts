import {Express, Request, Response, NextFunction} from 'express'
import {CommonRoutesConfig} from './common.routes';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: Express) {
        super(app, 'UsersRoutes');
    }

    configureRoutes() {

        this.app.route(`/users`)
            .get((req: Request, res: Response) => {
                res.status(200).send(`List of users`);
            })
            .post((req: Request, res: Response) => {
                res.status(200).send(`Post to users`);
            });

        this.app.route(`/users/:userId`)
            .all((req: Request, res: Response, next: NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get((req: Request, res: Response) => {
                res.status(200).send(`GET requested for id ${req.params.userId}`);
            })
            .put((req: Request, res: Response) => {
                res.status(200).send(`PUT requested for id ${req.params.userId}`);
            })
            .patch((req: Request, res: Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete((req: Request, res: Response) => {
                res.status(200).send(`DELETE requested for id ${req.params.userId}`);
            });

        return this.app;
    }

}