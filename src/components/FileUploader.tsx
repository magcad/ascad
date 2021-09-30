import { Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import FileUpload from './FileUpload';

type FileUploaderProps = {
  files: File[],
  onFileUploadEnd?: (validModelsIds: string[]) => void;
}
const FileUploader: React.FC<FileUploaderProps> = ({
  files,
  onFileUploadEnd,
}) => {
  const [uploadedFiles, setUploadedFiles] = useState(0);
  const [modelIds, setModelIds] = useState<string[]>([]);

  const handleUploadEnd = useCallback(() => {
    setUploadedFiles((upFiles) => upFiles + 1);
  }, []);

  const handleValidUpload = (modelId: string) => {
    setModelIds((oldModelIds) => {
      // Inutile ?
      const nOldModelIds = oldModelIds.slice();
      nOldModelIds.push(modelId);
      return nOldModelIds;
    });
  };

  useEffect(() => {
    if (modelIds.length >= files.length) {
      onFileUploadEnd?.call(null, modelIds);
    }
  }, [uploadedFiles, modelIds]);

  return (
    <>
      <Typography>
        {uploadedFiles === files.length ? 
          `Upload done !` :
          `Uploading files... (${uploadedFiles}/${files.length})`
        }
      </Typography>
      {files.map((file, i) => 
        <FileUpload
          key={i}
          file={file}
          onEnd={handleUploadEnd} 
          onValidUpload={handleValidUpload}
        /> 
      )}
    </>
  );
}

export default FileUploader;
