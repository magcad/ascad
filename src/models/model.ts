export interface Model {
  id: number;
  fileName: string;
  processed: boolean;
  filePath: string;
  fileLength: number;
  userFK: number;
  parentProcessId: number;
  uploadDateTime: Date;
}
