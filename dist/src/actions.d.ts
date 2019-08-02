import { ActionType } from "typesafe-actions";
import { IHttpConnectionOptions } from "@aspnet/signalr";
export declare const createSignalRHub: (props: {
    hubName: string;
    url: string;
    options?: IHttpConnectionOptions;
}) => {
    hubName: string;
    url: string;
    options?: IHttpConnectionOptions;
    type: "@signalr/createHub";
};
export declare const SIGNALR_HUB_UNSTARTED = "@signalr/hubUnstarted";
export declare const signalrHubUnstarted: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/hubUnstarted";
};
export declare const startSignalRHub: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/startHub";
};
export declare const reconnectSignalRHub: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/reconnectHub";
};
export declare const SIGNALR_HUB_FAILED_TO_START = "@signalr/hubFailedToStart";
export declare const signalrHubFailedToStart: (props: {
    hubName: string;
    url: string;
    error: any;
}) => {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/hubFailedToStart";
};
export declare const SIGNALR_CONNECTED = "@signalr/connected";
export declare const signalrConnected: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/connected";
};
export declare const SIGNALR_STARTED = "@signalr/started";
export declare const signalrStarted: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/started";
};
export declare const SIGNALR_DISCONNECTED = "@signalr/disconnected";
export declare const signalrDisconnected: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/disconnected";
};
export declare const SIGNALR_ERROR = "@signalr/error";
export declare const signalrError: (props: {
    hubName: string;
    url: string;
    error: any;
}) => {
    hubName: string;
    url: string;
    error: any;
    type: "@signalr/error";
};
export declare const hubNotFound: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: "@signalr/hubNotFound";
};
declare const signalRAction: {
    createSignalRHub: (props: {
        hubName: string;
        url: string;
        options?: IHttpConnectionOptions;
    }) => {
        hubName: string;
        url: string;
        options?: IHttpConnectionOptions;
        type: "@signalr/createHub";
    };
    signalrHubUnstarted: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/hubUnstarted";
    };
    startSignalRHub: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/startHub";
    };
    reconnectSignalRHub: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/reconnectHub";
    };
    signalrHubFailedToStart: (props: {
        hubName: string;
        url: string;
        error: any;
    }) => {
        hubName: string;
        url: string;
        error: any;
        type: "@signalr/hubFailedToStart";
    };
    signalrConnected: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/connected";
    };
    signalrDisconnected: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/disconnected";
    };
    signalrError: (props: {
        hubName: string;
        url: string;
        error: any;
    }) => {
        hubName: string;
        url: string;
        error: any;
        type: "@signalr/error";
    };
    hubNotFound: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/hubNotFound";
    };
    signalrStarted: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: "@signalr/started";
    };
};
export declare type SignalRAction = ActionType<typeof signalRAction>;
export {};
