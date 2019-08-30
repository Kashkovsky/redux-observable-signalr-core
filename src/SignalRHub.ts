import * as SignalR from "@aspnet/signalr";
import { Observable, Subject, from } from "rxjs";
import { HubConnectionState } from "@aspnet/signalr";

export type HubKeyDefinition = {
	hubName: string;
	url: string;
};

export type HubFullDefinition = HubKeyDefinition & {
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

export class SignalRHub implements ISignalRHub {
	private _connection: SignalR.HubConnection;
	private _start$: Subject<void>;
	private _stop$: Subject<void>;
	private _state$: Subject<HubConnectionState>;
	private _error$: Subject<SignalRError>;
	private _subjects: { [name: string]: Subject<any> };
	private _primePromise: Promise<any>;

	constructor(private _hubName: string, private _url: string, public options: SignalR.IHttpConnectionOptions = {}) {
		this._subjects = {};
		this._start$ = new Subject<void>();
		this._stop$ = new Subject<void>();
		this._state$ = new Subject<HubConnectionState>();
		this._error$ = new Subject<SignalRError>();
	}

	get connection(): SignalR.HubConnection {
		return this._connection || (this._connection = this.createConnection(this.url));
	}

	get hubName(): string {
		return this._hubName;
	}

	get url(): string {
		return this._url;
	}

	get start$(): Observable<void> {
		return this._start$.asObservable();
	}

	get stop$(): Observable<void> {
		return this._stop$.asObservable();
	}

	get state$(): Observable<HubConnectionState> {
		return this._state$.asObservable();
	}

	get error$(): Observable<Error> {
		return this._error$.asObservable();
	}

	start() {
		if (!this.hasSubscriptions())
			console.warn(
				"No listeners have been setup. You need to setup a listener before starting the connection or you will not receive data."
			);

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

	on<T>(event: string): Observable<T> {
		const subject = this.getOrCreateSubject<T>(event);
		this.connection.on(event, (data: T) => subject.next(data));
		return subject.asObservable();
	}

	off(event: string) {
		this.connection.off(event);
	}

	send(method: string, ...args: any[]) {
		return from(this._send(method, ...args));
	}

	hasSubscriptions(): boolean {
		for (let key in this._subjects) {
			if (this._subjects.hasOwnProperty(key)) {
				return true;
			}
		}

		return false;
	}

	private async _send(method: string, ...args: any[]) {
		if (!this._primePromise)
			return Promise.reject(
				"The connection has not been started yet. Please start the connection by invoking the start method befor attempting to send a message to the server."
			);
		await this._primePromise;
		return this.connection.invoke(method, ...args);
	}

	private getOrCreateSubject<T>(event: string): Subject<T> {
		return this._subjects[event] || (this._subjects[event] = new Subject<T>());
	}

	private createConnection(hub: string): SignalR.HubConnection {
		const connection = new SignalR.HubConnectionBuilder().withUrl(hub, this.options).build();
		connection.onclose(error => {
			this._state$.next(HubConnectionState.Disconnected);
			this._error$.next(error);
		});
		return connection;
	}
}

const hubs: ISignalRHub[] = [];

export function findHub(hubName: string, url: string): ISignalRHub | undefined;
export function findHub({ hubName, url }: { hubName: string; url: string }): ISignalRHub | undefined;
export function findHub(
	x: string | { hubName: string; url: string },
	url?: string | undefined
): ISignalRHub | undefined {
	if (typeof x === "string") {
		return hubs.filter(h => h.hubName === x && h.url === url)[0];
	}
	return hubs.filter(h => h.hubName === x.hubName && h.url === x.url)[0];
}

export const createHub = (
	hubName: string,
	url: string,
	options: SignalR.IHttpConnectionOptions = {}
): ISignalRHub | undefined => {
	const hub = new SignalRHub(hubName, url, options);
	hubs.push(hub);
	return hub;
};
