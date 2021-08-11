import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

type FileDropperProps = {
  onFileUpload?: (files: File[]) => void;
}
const FileDropper: React.FC<FileDropperProps> = ({
  onFileUpload
}: FileDropperProps) => {
  
  const handleChange = (files: File[]) => {
    onFileUpload?.apply(null, [files]);
  } 
  
  return (
    <DropzoneArea
      maxFileSize={1e9}
      onChange={handleChange}
    />
  );
}

export default FileDropper;
