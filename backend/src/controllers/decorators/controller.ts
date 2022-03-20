import 'reflect-metadata';
import AppRouter from '../../AppRouter';
import { Methods } from '../../Methods';
import { MetadataKeys } from '../../MetadataKeys';

const router = AppRouter.getInstance();
const controller = (routePrefix: string) => {
    return (target:Function) => {
        for (const key in target.prototype) {
            const routeHandler = target.prototype[key];
            const path:string = Reflect.getMetadata(MetadataKeys.path, target.prototype, key);
            const method:Methods = Reflect.getMetadata(MetadataKeys.method, target.prototype, key);
            const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) || [];

            router[method](`${routePrefix}${path}`, ...middlewares, routeHandler);
        }
    };
};

export { controller };