import { MonoTypeOperatorFunction, Observable } from "rxjs";
import { HubKeyDefinition, HubAction } from "./signalRHub";
import { ISignalRHub } from "./signalRHub";
export declare function ofHub<T extends HubAction>(hubName: string, url: string): MonoTypeOperatorFunction<T>;
export declare function ofHub<T extends HubAction>({ hubName, url }: HubKeyDefinition): MonoTypeOperatorFunction<T>;
export declare const mapToHub: () => import("rxjs/internal/types").OperatorFunction<{
    hubName: string;
    url: string;
}, ISignalRHub>;
declare type ObservableMapHubToActionInput = {
    action: HubAction;
    hub: ISignalRHub;
};
declare type ObservableMapHubToActionFunc<T> = (input: ObservableMapHubToActionInput) => Observable<T>;
export declare const mergeMapHubToAction: <T>(func: ObservableMapHubToActionFunc<T>) => import("rxjs/internal/types").OperatorFunction<HubAction, {
    hubName: string;
    url: string;
    type: string;
} | T>;
export declare const switchMapHubToAction: <T>(func: ObservableMapHubToActionFunc<T>) => import("rxjs/internal/types").OperatorFunction<HubAction, {
    hubName: string;
    url: string;
    type: string;
} | T>;
export declare const exhaustMapHubToAction: <T>(func: ObservableMapHubToActionFunc<T>) => import("rxjs/internal/types").OperatorFunction<HubAction, {
    hubName: string;
    url: string;
    type: string;
} | T>;
export {};
