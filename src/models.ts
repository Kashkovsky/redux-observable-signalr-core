import { IHttpConnectionOptions } from "@aspnet/signalr";
export type HubKeyDefinition = {
	hubName: string;
	url: string;
};

export type HubFullDefinition = HubKeyDefinition & {
	options?: IHttpConnectionOptions | undefined;
};

export interface HubAction {
	hubName: string;
	url: string;
}
