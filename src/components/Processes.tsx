import { Typography } from '@material-ui/core';
import React from 'react';
import { Scenario } from '../models/scenario';
import ProcessHandler from './ProcessHandler';

type ProcessesProps = {
  scenario: Scenario;
  modelIds: string[];
}
const Processes: React.FC<ProcessesProps> = ({
  scenario,
  modelIds,
}) => {

  return (
    <>
      <Typography>
        Processes : 
      </Typography>
      {(modelIds.map((modelId, i) =>
        <ProcessHandler
          key={i}
          modelUid={modelId}
          scenario={scenario}
        />
      ))}
    </>
  );
}

export default Processes;
