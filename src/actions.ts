import { createCustomAction, ActionType } from "typesafe-actions";
import { IHttpConnectionOptions } from "@aspnet/signalr";

export const actionTypes = {
	SIGNALR_HUB_CREATE: "@signalr/createHub",
	SIGNALR_HUB_CREATED: "@signalr/hubCreated",
	SIGNALR_HUB_START: "@signalr/startHub",
	SIGNALR_HUB_RECONNECT: "@signalr/reconnectHub",
	SIGNALR_HUB_FAILED_TO_START: "@signalr/hubFailedToStart",
	SUGNARR_HUB_NOTFOUND: "@signalr/hubNotFound",
	SIGNALR_CONNECTED: "@signalr/connected",
	SIGNALR_STARTED: "@signalr/started",
	SIGNALR_DISCONNECTED: "@signalr/disconnected",
	SIGNALR_ERROR: "@signalr/error"
};

export const createSignalRHub = createCustomAction(
	actionTypes.SIGNALR_HUB_CREATE,
	type => (props: { hubName: string; url: string; options?: IHttpConnectionOptions | undefined }) => ({
		type,
		...props
	})
);

export const signalrHubUnstarted = createCustomAction(
	actionTypes.SIGNALR_HUB_CREATED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const startSignalRHub = createCustomAction(
	actionTypes.SIGNALR_HUB_START,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const reconnectSignalRHub = createCustomAction(
	actionTypes.SIGNALR_HUB_RECONNECT,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const signalrHubFailedToStart = createCustomAction(
	actionTypes.SIGNALR_HUB_FAILED_TO_START,
	type => (props: { hubName: string; url: string; error: any }) => ({ type, ...props })
);

export const signalrConnected = createCustomAction(
	actionTypes.SIGNALR_CONNECTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const signalrStarted = createCustomAction(
	actionTypes.SIGNALR_STARTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const signalrDisconnected = createCustomAction(
	actionTypes.SIGNALR_DISCONNECTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const signalrError = createCustomAction(
	actionTypes.SIGNALR_ERROR,
	type => (props: { hubName: string; url: string; error: any }) => ({ type, ...props })
);

export const hubNotFound = createCustomAction(
	actionTypes.SUGNARR_HUB_NOTFOUND,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

const signalRAction = {
	createSignalRHub,
	signalrHubUnstarted,
	startSignalRHub,
	reconnectSignalRHub,
	signalrHubFailedToStart,
	signalrConnected,
	signalrDisconnected,
	signalrError,
	hubNotFound,
	signalrStarted
};

export type SignalRAction = ActionType<typeof signalRAction>;
