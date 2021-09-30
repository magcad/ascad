export interface Process {
  uid: string;
  modelInUid: string;
  modelOutUid: string;
  scenarioFK: number;
  startTime: Date;
  endTime: Date;
  status: number;
  result: any;
  log: string;
}
