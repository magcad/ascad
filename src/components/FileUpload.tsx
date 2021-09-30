import { Avatar, Box, createStyles, Grid, LinearProgress, makeStyles, Theme, Tooltip, Typography } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import { Check as CheckIcon, Clear as ClearIcon } from '@material-ui/icons';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { CONSTANTS } from '../constants';
import { Model } from '../models/model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    doneAvatar: {
      backgroundColor: green[500],
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    errorAvatar: {
      backgroundColor: red[500],
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
}));
type FileUploadProps = {
  file: File;
  onEnd?: () => void;
  onValidUpload?: (modelId: string) => void;
}
const FileUpload: React.FC<FileUploadProps> = ({
  file,
  onEnd,
  onValidUpload,
}) => {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onProgress = (event: ProgressEvent) => {
    event.stopPropagation();
    setProgress(Math.round(100 * event.loaded / event.total));
    if (event.loaded === event.total) {
      setIsDone(true);
      onEnd?.call(null);
    }
  }

  const getFeedbackAvatar = (): React.ReactNode => {
    if (error !== null) {
      return <Tooltip title={error}>
        <Avatar className={classes.errorAvatar}>
          <ClearIcon />
        </Avatar>
      </Tooltip>
    }
    if (isDone) {
      return <Avatar className={classes.doneAvatar}>
        <CheckIcon />
      </Avatar>
    }
    return <Typography>
      {progress} %
    </Typography>
  }

  useEffect(() => {
    const formData = new FormData();
    formData.append('UserFK', CONSTANTS.GENERIC_USER_KEY.toString());
    formData.append('CadModelFile', file);

    axiosInstance
      .post('/models', formData, {onUploadProgress: onProgress})
      .then((response) => {
        if (response.status !== 201) {
          setError(`${response.status} ${response.statusText}`);
        } else {
          const model = response.data as Model;
          onValidUpload?.call(null, model.uid);
        }
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <Grid
        container
        justifyContent="center"
        direction="row"
        alignItems="center"
      >
        <Typography>
          {file.name}
        </Typography>
      </Grid>
      <Box
        display="flex" 
        alignItems="center"
      >
        <Box
          width="90%"
          mr={1}
        >
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        <Box minWidth={35}>
          {getFeedbackAvatar()}
        </Box>
      </Box>
    </>
  );
}

export default FileUpload;
