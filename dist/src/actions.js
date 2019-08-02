import { createCustomAction } from "typesafe-actions";
export const createSignalRHub = createCustomAction("@signalr/createHub", type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_HUB_UNSTARTED = "@signalr/hubUnstarted";
export const signalrHubUnstarted = createCustomAction(SIGNALR_HUB_UNSTARTED, type => (props) => (Object.assign({ type }, props)));
export const startSignalRHub = createCustomAction("@signalr/startHub", type => (props) => (Object.assign({ type }, props)));
export const reconnectSignalRHub = createCustomAction("@signalr/reconnectHub", type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_HUB_FAILED_TO_START = "@signalr/hubFailedToStart";
export const signalrHubFailedToStart = createCustomAction(SIGNALR_HUB_FAILED_TO_START, type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_CONNECTED = "@signalr/connected";
export const signalrConnected = createCustomAction(SIGNALR_CONNECTED, type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_STARTED = "@signalr/started";
export const signalrStarted = createCustomAction(SIGNALR_STARTED, type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_DISCONNECTED = "@signalr/disconnected";
export const signalrDisconnected = createCustomAction(SIGNALR_DISCONNECTED, type => (props) => (Object.assign({ type }, props)));
export const SIGNALR_ERROR = "@signalr/error";
export const signalrError = createCustomAction(SIGNALR_ERROR, type => (props) => (Object.assign({ type }, props)));
export const hubNotFound = createCustomAction("@signalr/hubNotFound", type => (props) => (Object.assign({ type }, props)));
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
