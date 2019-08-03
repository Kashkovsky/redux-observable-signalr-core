import { Epic } from "redux-observable";
import { SignalRAction } from "./actions";
export declare const isOnline: () => import("rxjs/internal/Observable").Observable<boolean>;
export declare const createReconnect$: Epic<SignalRAction, SignalRAction>;
declare const _default: Epic<{
    hubName: string;
    url: string;
    options?: import("@aspnet/signalr/dist/esm/IHttpConnectionOptions").IHttpConnectionOptions;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    error: any;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    error: any;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
}, {
    hubName: string;
    url: string;
    options?: import("@aspnet/signalr/dist/esm/IHttpConnectionOptions").IHttpConnectionOptions;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    error: any;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
} | {
    hubName: string;
    url: string;
    error: any;
    type: string;
} | {
    hubName: string;
    url: string;
    type: string;
}, any, any>[];
export default _default;
