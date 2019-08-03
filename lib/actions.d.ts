import { ActionType } from "typesafe-actions";
import { IHttpConnectionOptions } from "@aspnet/signalr";
export declare const actionTypes: {
    SIGNALR_HUB_CREATE: string;
    SIGNALR_HUB_CREATED: string;
    SIGNALR_HUB_START: string;
    SIGNALR_HUB_RECONNECT: string;
    SIGNALR_HUB_FAILED_TO_START: string;
    SUGNARR_HUB_NOTFOUND: string;
    SIGNALR_CONNECTED: string;
    SIGNALR_STARTED: string;
    SIGNALR_DISCONNECTED: string;
    SIGNALR_ERROR: string;
};
export declare const createSignalRHub: (props: {
    hubName: string;
    url: string;
    options?: IHttpConnectionOptions;
}) => {
    hubName: string;
    url: string;
    options?: IHttpConnectionOptions;
    type: string;
};
export declare const signalrHubUnstarted: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const startSignalRHub: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const reconnectSignalRHub: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const signalrHubFailedToStart: (props: {
    hubName: string;
    url: string;
    error: any;
}) => {
    hubName: string;
    url: string;
    error: any;
    type: string;
};
export declare const signalrConnected: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const signalrStarted: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const signalrDisconnected: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
};
export declare const signalrError: (props: {
    hubName: string;
    url: string;
    error: any;
}) => {
    hubName: string;
    url: string;
    error: any;
    type: string;
};
export declare const hubNotFound: (props: {
    hubName: string;
    url: string;
}) => {
    hubName: string;
    url: string;
    type: string;
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
        type: string;
    };
    signalrHubUnstarted: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    startSignalRHub: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    reconnectSignalRHub: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    signalrHubFailedToStart: (props: {
        hubName: string;
        url: string;
        error: any;
    }) => {
        hubName: string;
        url: string;
        error: any;
        type: string;
    };
    signalrConnected: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    signalrDisconnected: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    signalrError: (props: {
        hubName: string;
        url: string;
        error: any;
    }) => {
        hubName: string;
        url: string;
        error: any;
        type: string;
    };
    hubNotFound: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
    signalrStarted: (props: {
        hubName: string;
        url: string;
    }) => {
        hubName: string;
        url: string;
        type: string;
    };
};
export declare type SignalRAction = ActionType<typeof signalRAction>;
export {};
