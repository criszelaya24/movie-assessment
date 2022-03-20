import 'reflect-metadata';
import { Methods } from '../../Methods';
import { MetadataKeys } from '../../MetadataKeys';

const routerBinder = (method:string) => {
    return (route:string) => {
        return (target: any, key: string) => {
            Reflect.defineMetadata(MetadataKeys.method, method, target, key);
            Reflect.defineMetadata(MetadataKeys.path, route, target, key);
        };
    };
};

export const del = routerBinder(Methods.delete);
export const post = routerBinder(Methods.post);
export const get = routerBinder(Methods.get);