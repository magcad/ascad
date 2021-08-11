import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(1),
      border: "4px dashed #eeeeee",
      backgroundColor: "#fafafa",
      color: "#bdbdbd",
      transition: "border .24s ease-in-out",
      fontSize: "16pt",
      cursor: "pointer",
    },
  }),
);
type FileDropperProps = {
  onFileUpload?: (files: File[]) => void;
}
const FileDropper: React.FC<FileDropperProps> = ({
  onFileUpload
}: FileDropperProps) => {
  const classes = useStyles();
  
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
