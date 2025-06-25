import express from 'express';
import routes from './routes.js';

class App {
    constructor() {
        this.app = express()

        this.middlewares();
        this.routes()
    }

middlewares() {
    this.app.use(express.json)
}
routes() {
this.app.use(routes)
}
}

const app = new App().app;
export default app;