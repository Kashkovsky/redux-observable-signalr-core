import { MonoTypeOperatorFunction, Observable, of } from "rxjs";
import { HubKeyDefinition, HubAction } from "./models";
import { filter, map, mergeMap, switchMap, exhaustMap } from "rxjs/operators";
import { findHub, ISignalRHub } from "./SignalRHub";
import { hubNotFound } from "./actions";

export function ofHub<T extends HubAction>(hubName: string, url: string): MonoTypeOperatorFunction<T>;
export function ofHub<T extends HubAction>({ hubName, url }: HubKeyDefinition): MonoTypeOperatorFunction<T>;
export function ofHub<T extends HubAction>(
	x: string | HubKeyDefinition,
	url?: string | undefined
): MonoTypeOperatorFunction<T> {
	if (typeof x === "string") {
		return filter(action => action.hubName === x && action.url === url);
	} else {
		return filter(action => action.hubName === x.hubName && action.url === x.url);
	}
}

export const mapToHub = () => map(findHub);

type ObservableMapHubToActionInput = {
	action: HubAction;
	hub: ISignalRHub;
};
type ObservableMapHubToActionFunc<T> = (input: ObservableMapHubToActionInput) => Observable<T>;

const hubAndActionOrNotFound = <T>(func: ObservableMapHubToActionFunc<T>) => (action: HubAction) => {
	const hub = findHub(action);
	if (!hub) {
		return of(hubNotFound(action));
	}

	return func({ action, hub });
};

export const mergeMapHubToAction = <T>(func: ObservableMapHubToActionFunc<T>) => mergeMap(hubAndActionOrNotFound(func));

export const switchMapHubToAction = <T>(func: ObservableMapHubToActionFunc<T>) =>
	switchMap(hubAndActionOrNotFound(func));

export const exhaustMapHubToAction = <T>(func: ObservableMapHubToActionFunc<T>) =>
	exhaustMap(hubAndActionOrNotFound(func));
