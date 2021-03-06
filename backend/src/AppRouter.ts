import { Router } from 'express';

export default class AppRouter {

    private static instance: Router

    static getInstance():Router {
        if (!this.instance) {
            this.instance = Router();
        }

        return  this.instance;
    }

}