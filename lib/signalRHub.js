var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as SignalR from "@aspnet/signalr";
import { Subject, from } from "rxjs";
import { HubConnectionState } from "@aspnet/signalr";
export class SignalRHub {
    constructor(_hubName, _url, options = {}) {
        this._hubName = _hubName;
        this._url = _url;
        this.options = options;
        this._subjects = {};
        this._start$ = new Subject();
        this._stop$ = new Subject();
        this._state$ = new Subject();
        this._error$ = new Subject();
    }
    get connection() {
        return this._connection || (this._connection = this.createConnection(this.url));
    }
    get hubName() {
        return this._hubName;
    }
    get url() {
        return this._url;
    }
    get start$() {
        return this._start$.asObservable();
    }
    get stop$() {
        return this._stop$.asObservable();
    }
    get state$() {
        return this._state$.asObservable();
    }
    get error$() {
        return this._error$.asObservable();
    }
    start() {
        if (!this.hasSubscriptions())
            console.warn("No listeners have been setup. You need to setup a listener before starting the connection or you will not receive data.");
        this._primePromise = this.connection
            .start()
            .then(() => {
            this._state$.next(HubConnectionState.Connected);
            this._start$.next();
        })
            .catch(error => this._start$.error(error));
        return this._start$.asObservable();
    }
    stop() {
        this._primePromise = this.connection
            .stop()
            .then(() => {
            this._state$.next(HubConnectionState.Disconnected);
            this._stop$.next();
        })
            .catch(error => this._stop$.error(error));
        return this._stop$.asObservable();
    }
    on(event) {
        const subject = this.getOrCreateSubject(event);
        this.connection.on(event, (data) => subject.next(data));
        return subject.asObservable();
    }
    off(event) {
        this.connection.off(event);
    }
    send(method, ...args) {
        return from(this._send(method, ...args));
    }
    hasSubscriptions() {
        for (let key in this._subjects) {
            if (this._subjects.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }
    _send(method, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._primePromise)
                return Promise.reject("The connection has not been started yet. Please start the connection by invoking the start method befor attempting to send a message to the server.");
            yield this._primePromise;
            return this.connection.invoke(method, ...args);
        });
    }
    getOrCreateSubject(event) {
        return this._subjects[event] || (this._subjects[event] = new Subject());
    }
    createConnection(hub) {
        const connection = new SignalR.HubConnectionBuilder().withUrl(hub, this.options).build();
        connection.onclose(error => {
            this._state$.next(HubConnectionState.Disconnected);
            this._error$.next(error);
        });
        return connection;
    }
}
const hubs = [];
export function findHub(x, url) {
    if (typeof x === "string") {
        return hubs.filter(h => h.hubName === x && h.url === url)[0];
    }
    return hubs.filter(h => h.hubName === x.hubName && h.url === x.url)[0];
}
export const createHub = (hubName, url, options = {}) => {
    const hub = new SignalRHub(hubName, url, options);
    hubs.push(hub);
    return hub;
};
