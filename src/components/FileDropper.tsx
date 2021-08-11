import React from 'react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1rem',
      padding: '1rem',
      border: '3px dashed #eeeeee',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      transition: 'border .24s ease-in-out',
      fontSize: '16pt',
      cursor: 'pointer',
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
  
  const onDrop = useCallback((files) => {
    onFileUpload?.apply(null, [files]);
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
  return (
    <div className={classes.root} {...getRootProps()}>
      <Grid
        container
        justifyContent="center"
        direction="column"
        alignItems="center"
      >
        <input {...getInputProps()} />
        {isDragActive ?
          <p>Drop the files here...</p> :
          <p>Drag and drop files here, or click to select files</p>
        }
        <CloudDownloadIcon fontSize="large" />
      </Grid>
    </div>
  );
}

export default FileDropper;
