import { Epic } from "redux-observable";
import {
	SignalRAction,
	createSignalRHub,
	signalrHubUnstarted,
	signalrHubFailedToStart,
	signalrConnected,
	signalrDisconnected,
	signalrError,
	reconnectSignalRHub,
	startSignalRHub,
	signalrStarted
} from "./actions";
import { isActionOf } from "typesafe-actions";
import { filter, mergeMap, catchError, map, startWith, groupBy, takeUntil, switchMap } from "rxjs/operators";
import { createHub, findHub } from "./SignalRHub";
import { of, EMPTY, merge, fromEvent, timer } from "rxjs";
import { HubConnectionState } from "@aspnet/signalr";
import { exhaustMapHubToAction, ofHub } from "./operators";

const offline$ = fromEvent(window, "offline").pipe(map(() => false));
const online$ = fromEvent(window, "online").pipe(map(() => true));
export const isOnline = () => merge(offline$, online$).pipe(startWith(navigator.onLine));

const createHub$: Epic<SignalRAction, SignalRAction> = action$ =>
	action$.pipe(
		filter(isActionOf(createSignalRHub)),
		mergeMap(action => {
			const hub = createHub(action.hubName, action.url, action.options);
			if (!hub) {
				return EMPTY;
			}

			return of(signalrHubUnstarted({ hubName: hub.hubName, url: hub.url }));
		})
	);

const beforeStartHub$: Epic<SignalRAction, SignalRAction> = action$ =>
	action$.pipe(
		filter(isActionOf(signalrHubUnstarted)),
		mergeMap(action => {
			const hub = findHub(action);

			if (!hub) {
				return EMPTY;
			}

			const start$ = hub.start$.pipe(
				mergeMap(_ => EMPTY),
				catchError(error => of(signalrHubFailedToStart({ hubName: action.hubName, url: action.url, error })))
			);

			const state$ = hub.state$.pipe(
				mergeMap(state => {
					if (state === HubConnectionState.Connected) {
						return of(signalrConnected({ hubName: action.hubName, url: action.url }));
					}
					if (state === HubConnectionState.Disconnected) {
						console.log("state change", state);
						return of(signalrDisconnected({ hubName: action.hubName, url: action.url }));
					}
					return EMPTY;
				})
			);

			const error$ = hub.error$.pipe(
				map(error => signalrError({ hubName: action.hubName, url: action.url, error }))
			);

			return merge(start$, state$, error$);
		})
	);

const startHub$: Epic<SignalRAction, SignalRAction> = action$ =>
	action$.pipe(
		filter(isActionOf(startSignalRHub)),
		map(findHub),
		mergeMap(hub => {
			return hub
				.start()
				.pipe(map(() => signalrStarted({ hubName: hub.hubName, url: hub.url })), catchError(() => EMPTY));
		})
	);

export const createReconnect$: Epic<SignalRAction, SignalRAction> = action$ =>
	action$.pipe(
		filter(isActionOf(signalrDisconnected)),
		groupBy(action => action.hubName),
		mergeMap(group =>
			group.pipe(
				exhaustMapHubToAction(({ action }) =>
					isOnline().pipe(
						switchMap(online => {
							if (!online) {
								return EMPTY;
							}
							return timer(0, 5000);
						}),
						map(_ => reconnectSignalRHub({ hubName: action.hubName, url: action.url })),
						takeUntil(action$.pipe(filter(isActionOf(signalrConnected)), ofHub(action)))
					)
				)
			)
		)
	);

export default [ createHub$, beforeStartHub$, startHub$, createReconnect$ ];
