import { CircularProgress, createStyles, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, Theme, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import { Scenario } from '../models/scenario';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
  }),
);
type ScenariosProps = {
  onSelectedScenarioChange: (scenario: Scenario) => void;
}
const Scenarios: React.FC<ScenariosProps> = ({
  onSelectedScenarioChange,
}) => {
  const classes = useStyles();
  const [scenarios, setSenarios] = useState<Scenario[] | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  
  const updateScenario = useCallback((scenario: Scenario | null) => {
    setSelectedScenario(scenario);
    if (scenario !== null) {
      onSelectedScenarioChange(scenario);
    }
  }, []);
  
  useEffect(() => {
    axiosInstance.get('/scenarios').then(async (response) => {
      if (response.status === 200) {
        const scenarioListJson = response.data as Scenario[];
        setSenarios(scenarioListJson);
        if (scenarioListJson.length > 0) {
          updateScenario(scenarioListJson[0]);
        }
      } else {
        setSenarios(null);
      }
    })
  }, [updateScenario]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedScenarioID = Number.parseInt((event.target as HTMLInputElement).value);
    updateScenario(scenarios?.find((scenario) => scenario.id === selectedScenarioID) ?? null);
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {scenarios === null ?
          <>
            <CircularProgress />
            <Typography>
              Loading scenarios...
            </Typography>
          </>
          :
          <FormControl component="fieldset">
            <FormLabel component="legend">
              Scenarios
            </FormLabel>
            <RadioGroup 
              name="scenario" 
              value={selectedScenario?.id ?? -1} 
              onChange={handleChange}
            >
              {scenarios !== null && scenarios.map((scenario) => 
                <FormControlLabel
                  key={scenario.id}
                  value={scenario.id}
                  control={<Radio color="primary" />}
                  label={scenario.name}
                />
              )}
            </RadioGroup>
          </FormControl>
        }
      </Grid>
    </div>
  );
}

export default Scenarios;
