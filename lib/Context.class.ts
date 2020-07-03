import {Application} from "./Application.class";
import {Middleware} from "./Middleware.class";
import { Router } from "./Router.class";
import { Route } from "./Route.class";

export namespace Context {
    import NextCallback = Middleware.NextCallback;
    import Dict = NodeJS.Dict;

    export class Context implements IContext {
        public params: Dict<string>;
        public captures: string;
        public matched: Route.Route[] = [];
        public routerPath: string;
        public path: string;
        public router: Router.Router;
        public routerName: string;
        public _matchedRoute: string;
        public _matchedRouteName: string;
        public app: Application.Application;
        public __pathStory: Set<string> = new Set;
        [key: string]: any;

        constructor(protected readonly options: IOptions) {
            this.path = this.options.path;
            this.app = this.options.app;
        }

        public set(key: string, val: any): any {
            this[key] = val;
            return val;
        }

        public get(key: string): any {
            return this[key];
        }

        public store() {
            return new Map(this.__store);
        }

        public restore(newStore: Map<string, any>) {
            return this.__store = newStore;
        }

        public error(err: Error) {
            throw err;
        }

        public assert(bool: boolean, err: Error) {
            if (!Boolean(bool)) {
                this.error(err);
            }
        }

        public send(path: Router.Path, data: any) {
            this.options.app.send(path, data, this);
        }
    }

    export interface IContext {
        next?: NextCallback;
        [key: string]: any;
    }

    export interface IOptions {
        app: Application.Application;
        [key: string]: any;
    }
}