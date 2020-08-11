import { Interface, Dictionary } from "./type-utils";

export const defineEndpoint = <T extends EndpointDefinition>(def: T) => def;

export class RequestBodyUnwrap<T> implements RequestUnwrapper<T> {
    readonly type = "body";
    read(request: any) {
        return request.body as T;
    }
}

export type RequestParams<T extends PayloadVerbDefinition> = {
    [param in keyof T["request"]]: InjectedProp<T["request"][param]>
};

export type InjectedProp<T> = T extends RequestUnwrapper<infer U> ? U
    : T extends symbol ? any : T;

export class RouteParamUnwrap implements RequestUnwrapper<string> {
    readonly type = "route-param";

    constructor(
        private param: string
    ) {}

    read(request: any): string {
        return request.params[this.param];
    }
}

export interface RequestUnwrapper<T> {
    read(request: Interface<any>): T;
}

export const Type = <T>(): TypePlaceholder<T> => ({});

export interface TypePlaceholder<T> {
    type?: T;
}

export interface EndpointDefinition {
    [ action: string ]: PayloadVerbDefinition;
}

export interface ApiConfig {
  baseUrl: string;
}

export interface PayloadVerbDefinition<T = any> {
    method: "post" | "put" | "patch";
    url: string;
    request: Dictionary<PostPutInjectionParam<any>>;
    response: TypePlaceholder<T>;
}

export type PostPutInjectionParam<T> = DefaultInjectionParam | RequestBodyUnwrap<T>;

type DefaultInjectionParam = RouteParamUnwrap;

export type InjectionParamMap = Dictionary<PostPutInjectionParam<any>>;
