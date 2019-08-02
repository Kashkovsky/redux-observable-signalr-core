import { Epic } from "redux-observable";
import { SignalRAction } from "./actions";
export declare const isOnline: () => import("rxjs/internal/Observable").Observable<boolean>;
export declare const createReconnect$: Epic<SignalRAction, SignalRAction>;
declare const _default: Epic<{
    hubName: string;
    url: string;
    options?: import("@aspnet/signalr/dist/esm/IHttpConnectionOptions").IHttpConnectionOptions;
    type: "@signalr/createHub";
} | {
    hubName: string;
    url: string;
    type: "@signalr/hubUnstarted";
} | {
    hubName: string;
    url: string;
    type: "@signalr/startHub";
} | {
    hubName: string;
    url: string;
    type: "@signalr/reconnectHub";
} | {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/hubFailedToStart";
} | {
    hubName: string;
    url: string;
    type: "@signalr/connected";
} | {
    hubName: string;
    url: string;
    type: "@signalr/started";
} | {
    hubName: string;
    url: string;
    type: "@signalr/disconnected";
} | {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/error";
} | {
    hubName: string;
    url: string;
    type: "@signalr/hubNotFound";
}, {
    hubName: string;
    url: string;
    options?: import("@aspnet/signalr/dist/esm/IHttpConnectionOptions").IHttpConnectionOptions;
    type: "@signalr/createHub";
} | {
    hubName: string;
    url: string;
    type: "@signalr/hubUnstarted";
} | {
    hubName: string;
    url: string;
    type: "@signalr/startHub";
} | {
    hubName: string;
    url: string;
    type: "@signalr/reconnectHub";
} | {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/hubFailedToStart";
} | {
    hubName: string;
    url: string;
    type: "@signalr/connected";
} | {
    hubName: string;
    url: string;
    type: "@signalr/started";
} | {
    hubName: string;
    url: string;
    type: "@signalr/disconnected";
} | {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/error";
} | {
    hubName: string;
    url: string;
    type: "@signalr/hubNotFound";
}, any, any>[];
export default _default;
