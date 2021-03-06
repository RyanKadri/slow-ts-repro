import { EndpointDefinition, InjectedProp, PayloadVerbDefinition } from "./endpoint-types";

export type RouteImplementation<T extends EndpointDefinition> = {
    [ action in keyof T ]: MethodImplementation<T[action]>
};

export type MethodImplementation<Action extends PayloadVerbDefinition> =
    (opts: {
        [param in keyof Action["request"]]: InjectedProp<Action["request"][param]>
    }) => RouteResponse<Action["response"]["type"]> | Promise<RouteResponse<Action["response"]["type"]>>;

export type RouteResponse<C> = ExplicitResponse<C> | C;

export interface SuccessResponse<C> {
    type: "success";
    payload: C;
}

export interface ErrorResponse {
    type: "error";
    code: number;
    message: string;
}

export class ExplicitResponse<C> {
    constructor(public response: SuccessResponse<C> | ErrorResponse) {}
}
