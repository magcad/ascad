import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import useInterval from '../hooks/useInterval';
import { Process } from '../models/process';
import { Scenario } from '../models/scenario';

type ProcessHandlerProps = {
  modelId: number;
  scenario: Scenario;
}
const ProcessHandler: React.FC<ProcessHandlerProps> = ({
  modelId,
  scenario,
}) => {
  const [process, setProcess] = useState<Process | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processResult, setProcessResult] = useState<Process | null>(null);
  const [isDone, setIsDone] = useState(false)

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
          id="log1"
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
      </Accordion>
    </>
  );
}

export default ProcessHandler;
