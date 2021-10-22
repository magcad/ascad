import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { CONSTANTS } from '../constants';
import useInterval from '../hooks/useInterval';
import { Process } from '../models/process';
import { Scenario } from '../models/scenario';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    downloadButton: {
      margin: theme.spacing(1),
    },
    logAccordion: {
      wordWrap: "break-word",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    },
  }),
);

type ProcessHandlerProps = {
  modelUid: string;
  scenario: Scenario;
}
const ProcessHandler: React.FC<ProcessHandlerProps> = ({
  modelUid,
  scenario,
}) => {
  const classes = useStyles();
  const [process, setProcess] = useState<Process | null>(null);
  // TODO : Gérer les erreurs (snackbar?)
  //const [error, setError] = useState<string | null>(null);
  const [processResult, setProcessResult] = useState<Process | null>(null);
  const [isDone, setIsDone] = useState(false)

  const handleDownload = () => {
    if (processResult === null) 
      return;

    const url = `${CONSTANTS.API_BASE_URL}/models/download/${processResult.modelOutUid}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useInterval(() => {
    axiosInstance
      .get(`/processes/${process?.uid ?? 0}`)
      .then((response) => {
        setProcessResult(response.data as Process);
        if (processResult?.status == 2) {
          setIsDone(true);
        }
      });
  }, process !== null && !isDone ? 1000 : null);

  useEffect(() => {
    const formData = new FormData();
    formData.append('modelInUid', modelUid.toString());
    formData.append('scenarioFK', scenario.id.toString());
    formData.append('userFK', CONSTANTS.GENERIC_USER_KEY.toString());

    axiosInstance
      .post('/processes', JSON.stringify(Object.fromEntries(formData)))
      .then((response) => {
        if (response.status !== 201) {
          // setError(`${response.status} ${response.statusText}`);
        } else {
          setProcess(response.data as Process);
        }
      })
      .catch(() => { // error parameter
        // setError(error.message);
      })
  }, []);

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Typography>
            Processing model #{modelUid} with scenario {scenario.name}
          </Typography>
        </Grid>
          <Grid item>
            <Button 
              className={classes.downloadButton}
              onClick={handleDownload}
              variant="contained"
              color="primary"
              size="large"
              disabled={!isDone}
            >
              {isDone ?
              "Download"
              :
              "Processing..."
              }
            </Button>
          </Grid>
      </Grid>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={modelUid.toString()}
        >
          See Log
        </AccordionSummary>
        <AccordionDetails>
          <pre className={classes.logAccordion}>
            <code>
              {processResult?.log.replace(/\r/g, '\n') ?? "..."}
            </code>
          </pre>
        </AccordionDetails>
      </Accordion>
    </>
  );
}

export default ProcessHandler;
