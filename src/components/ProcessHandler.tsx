import { Accordion, AccordionDetails, AccordionSummary, Button, createStyles, makeStyles, Theme, Typography } from '@material-ui/core';
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
  }),
);

type ProcessHandlerProps = {
  modelId: number;
  scenario: Scenario;
}
const ProcessHandler: React.FC<ProcessHandlerProps> = ({
  modelId,
  scenario,
}) => {
  const classes = useStyles();
  const [process, setProcess] = useState<Process | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processResult, setProcessResult] = useState<Process | null>(null);
  const [isDone, setIsDone] = useState(false)

  const handleDownload = () => {
    if (processResult === null) 
      return;

    const url = `${CONSTANTS.API_BASE_URL}/models/download/${processResult.modelOutFK}`;
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  useInterval(() => {
    axiosInstance
      .get(`/processes/${process?.id ?? 0}`)
      .then((response) => {
        setProcessResult(response.data as Process);
        if (processResult?.status == 2) {
          setIsDone(true);
        }
      });
  }, process !== null && !isDone ? 1000 : null);

  useEffect(() => {
    const formData = new FormData();
    formData.append('modelInFK', modelId.toString());
    formData.append('scenarioFK', scenario.id.toString());
    formData.append('userFK', CONSTANTS.GENERIC_USER_KEY.toString());

    axiosInstance
      .post('/processes', JSON.stringify(Object.fromEntries(formData)))
      .then((response) => {
        if (response.status !== 201) {
          setError(`${response.status} ${response.statusText}`);
        } else {
          setProcess(response.data as Process);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
  }, []);

  return (
    <>
      <Typography>
        Processing model #{modelId} with scenario {scenario.name}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          id={modelId.toString()}
        >
          See Log
        </AccordionSummary>
        <AccordionDetails>
          <pre>
            <code>
              {processResult?.log.replace(/\r/g, '\n') ?? "..."}
            </code>
          </pre>
        </AccordionDetails>
        {isDone ?
          <Button 
            className={classes.downloadButton}
            onClick={handleDownload}
            variant="contained"
            color="primary"
            size="large"
          >
            Download
          </Button>
          : null
        }
      </Accordion>
    </>
  );
}

export default ProcessHandler;
