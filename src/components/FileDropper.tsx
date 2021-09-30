import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

type FileDropperProps = {
  onFileUpload?: (files: File[]) => void;
}
const FileDropper: React.FC<FileDropperProps> = ({
  onFileUpload
}) => {
  
  const handleChange = (files: File[]) => {
    onFileUpload?.apply(null, [files]);
  } 
  
  return (
    <DropzoneArea
      maxFileSize={1e9}
      filesLimit={10}
      dropzoneText={"Drag and drop a STEP file here or click"}
      onChange={handleChange}
    />
  );
}

export default FileDropper;
