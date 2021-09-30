export interface Model {
  uid: string;
  fileName: string;
  processed: boolean;
  fileLength: number;
  userFK: number;
  parentProcessId: number;
  uploadDateTime: Date;
}
