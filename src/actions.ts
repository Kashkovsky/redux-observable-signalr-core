import { createCustomAction, ActionType } from "typesafe-actions";
import { IHttpConnectionOptions } from "@aspnet/signalr";

export const createSignalRHub = createCustomAction(
	"@signalr/createHub",
	type => (props: { hubName: string; url: string; options?: IHttpConnectionOptions | undefined }) => ({
		type,
		...props
	})
);

export const SIGNALR_HUB_UNSTARTED = "@signalr/hubUnstarted";
export const signalrHubUnstarted = createCustomAction(
	SIGNALR_HUB_UNSTARTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const startSignalRHub = createCustomAction(
	"@signalr/startHub",
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const reconnectSignalRHub = createCustomAction(
	"@signalr/reconnectHub",
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const SIGNALR_HUB_FAILED_TO_START = "@signalr/hubFailedToStart";
export const signalrHubFailedToStart = createCustomAction(
	SIGNALR_HUB_FAILED_TO_START,
	type => (props: { hubName: string; url: string; error: any }) => ({ type, ...props })
);

export const SIGNALR_CONNECTED = "@signalr/connected";
export const signalrConnected = createCustomAction(
	SIGNALR_CONNECTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const SIGNALR_STARTED = "@signalr/started";
export const signalrStarted = createCustomAction(
	SIGNALR_STARTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const SIGNALR_DISCONNECTED = "@signalr/disconnected";
export const signalrDisconnected = createCustomAction(
	SIGNALR_DISCONNECTED,
	type => (props: { hubName: string; url: string }) => ({ type, ...props })
);

export const SIGNALR_ERROR = "@signalr/error";
export const signalrError = createCustomAction(
	SIGNALR_ERROR,
	type => (props: { hubName: string; url: string; error: any }) => ({ type, ...props })
);

export const hubNotFound = createCustomAction(
	"@signalr/hubNotFound",
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
