import * as SignalR from "@aspnet/signalr";
import { Observable } from "rxjs";
import { HubConnectionState } from "@aspnet/signalr";
export declare type HubKeyDefinition = {
    hubName: string;
    url: string;
};
export declare type HubFullDefinition = HubKeyDefinition & {
    options?: SignalR.IHttpConnectionOptions | undefined;
};
export interface HubAction {
    hubName: string;
    url: string;
}
export interface SignalRError extends Error {
    context?: any;
    transport?: string;
    soruce?: string;
}
export interface ISignalRHub {
    hubName: string;
    url: string;
    options: SignalR.IHttpConnectionOptions | undefined;
    autoReconnect: boolean;
    start$: Observable<void>;
    stop$: Observable<void>;
    state$: Observable<HubConnectionState>;
    error$: Observable<Error | undefined>;
    start(): Observable<void>;
    stop(): Observable<void>;
    on<T>(eventName: string): Observable<T>;
    off(eventName: string): void;
    send(methodName: string, ...args: any[]): Observable<any>;
    hasSubscriptions(): boolean;
}
export declare class SignalRHub implements ISignalRHub {
    private _hubName;
    private _url;
    autoReconnect: boolean;
    options: SignalR.IHttpConnectionOptions;
    private _connection;
    private _start$;
    private _stop$;
    private _state$;
    private _error$;
    private _subjects;
    private _primePromise;
    constructor(_hubName: string, _url: string, autoReconnect: boolean, options?: SignalR.IHttpConnectionOptions);
    readonly connection: SignalR.HubConnection;
    readonly hubName: string;
    readonly url: string;
    readonly start$: Observable<void>;
    readonly stop$: Observable<void>;
    readonly state$: Observable<HubConnectionState>;
    readonly error$: Observable<Error>;
    start(): Observable<void>;
    stop(): Observable<void>;
    on<T>(event: string): Observable<T>;
    off(event: string): void;
    send(method: string, ...args: any[]): Observable<any>;
    hasSubscriptions(): boolean;
    private _send;
    private getOrCreateSubject;
    private createConnection;
}
export declare function findHub(hubName: string, url: string): ISignalRHub | undefined;
export declare function findHub({ hubName, url }: {
    hubName: string;
    url: string;
}): ISignalRHub | undefined;
export declare const createHub: (hubName: string, url: string, autoReconnect?: boolean, options?: SignalR.IHttpConnectionOptions) => ISignalRHub;
