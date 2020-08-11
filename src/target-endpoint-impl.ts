import { RouteImplementation } from "./route-types";
import { siteTargetEndpoint } from "./target-endpoint-metadata";
import { TargetEntity } from "./targets";
import { WindowHolder } from "./targets"
import { DeepPartial } from "./type-utils";

type TargetEndpointType = RouteImplementation<typeof siteTargetEndpoint>;

export class TargetEndpoint implements TargetEndpointType {

  updateSiteTarget: TargetEndpointType["updateSiteTarget"] = async ({ target: updates }) => {
    const holder: WindowHolder = { window };
    console.log(holder)
    const repo = new Repo<TargetEntity>();
    const target = repo.findTarget();
    return repo.save({ ...target, ...updates })
  }
}

class Repo<Entity> {
  findTarget(): TargetEntity | undefined {
    return {} as unknown as TargetEntity | undefined;
  }
  
  save<T extends DeepPartial<Entity>>(entity: T): Promise<T & Entity> {
    console.log(entity);
    return {} as Promise<T & Entity> 
  }
}
