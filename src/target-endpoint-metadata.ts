import { defineEndpoint, RequestBodyUnwrap, RouteParamUnwrap, Type } from "./endpoint-types";
import { TargetEntity } from "./targets";

const singleTargetUrl = "/targets/:targetId";

export const siteTargetApiSymbol = Symbol("siteTargetApi");
export const siteTargetEndpoint = defineEndpoint({
  updateSiteTarget: {
    method: "patch",
    url: singleTargetUrl,
    request: {
      targetId: new RouteParamUnwrap("targetId"),
      target: new RequestBodyUnwrap<Partial<TargetEntity>>()
    },
    response: Type<TargetEntity>()
  }
});
