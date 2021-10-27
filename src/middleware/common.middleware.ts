import { Router } from "express";
import cors from "cors";
import compression from "compression";


class CommonMiddleware {
    handleCors = (router: Router) => router.use(cors({ credentials: true, origin: true }))

    handleCompression = (router: Router) => {
        router.use(compression());
    };
}

export default new CommonMiddleware();