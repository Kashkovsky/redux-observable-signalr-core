# redux-observable-signalr-core
[![npm](https://img.shields.io/npm/dm/redux-observable-signalr-core.svg)]()
[![npm version](https://badge.fury.io/js/redux-observable-signalr-core.svg)](https://badge.fury.io/js/redux-observable-signalr-core)


A library to handle realtime SignalR (.NET Core) events using redux, rxjs and redux-observable.
Inspired by https://github.com/Odonno/ngrx-signalr-core

## Get started

### Install dependencies

```
npm install redux rxjs redux-obsevable @aspnet/signalr --save
npm install redux-observable-signalr-core --save
```

### Add signalR$ to your root Epic

```ts
import { signalR$ } from "redux-observable-signalr-core";

const epics = combineEpics(
	// other epics
	...signalR$
);
```

### Start with a single Hub

First, you will start the application by dispatching the creation of one Hub.

```ts
import { createSignalRHub } from "redux-observable-signalr-core/lib/actions";

// TODO : your hub definition
const hub = {
    hubName: 'hub name',
    url: 'https://localhost/path'
};

store.dispatch(createSignalRHub(hub));
```

Then you will create an Epic to start listening to events before starting the Hub.

```ts
import { signalrHubUnstarted, startSignalRHub } from "redux-observable-signalr-core/lib/actions";
import { mergeMapHubToAction } from "redux-observable-signalr-core/lib/operators";

const listenNotification$: Epic<Action, Action, IRootState> = action$ =>
	action$.pipe(
		filter(isActionOf(signalrHubUnstarted)),
		mergeMapHubToAction(({ hub }) => {

			const receiveNotification$ = hub
				.on<Notification>(method)
				.pipe(
					map(actions.notificationReceived)
				);

			const exististingNotifications$ = hub
				.on<Notification[]>(existing)
				.pipe(
					map(actions.getNotificationsSuccess)
				);

			return merge(receiveNotification$, exististingNotifications$, of(startSignalRHub(NotificationHub)));
		})
	);
```

You can also send events at anytime.

```ts
import { findHub } from "redux-observable-signalr-core/lib/signalRHub";
import { hubNotFound } from "redux-observable-signalr-core/lib/actions";

const sendNotification$: Epic<Action, Action, IRootState> = action$ =>
	action$.pipe(
		filter(isActionOf(actions.sendNotification)),
		mergeMap(action => {
			const hub = findHub(NotificationHub);
			if (!hub) {
				return of(hubNotFound(NotificationHub));
			}
			return hub
				.send(sendNotification, action.payload)
				.pipe(
					map(actions.sendNotificationSuccess),
					catchError((e) => of(actions.sendNotificationError))
				);
		})
	);
```

### Handling reconnection

Since .NET Core, client needs to handle the SignalR Hub reconnection by itself. `redux-observable-signalr-core` does it for you automatically, no additional setup required.
