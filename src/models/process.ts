export interface Process {
  id: number;
  modelInFK: number;
  modelOutFK: number;
  scenarioFK: number;
  startTime: Date;
  endTime: Date;
  status: number;
  result: any;
  log: string;
}
