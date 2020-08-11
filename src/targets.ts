export class TargetEntity {
  id: number;
  name: string;
  customerId: string;
  compileSlowlyFlag: Window;
}

export interface WindowHolder {
  window: Window;
}