import { createStyles, FormControl, FormControlLabel, FormLabel, Grid, makeStyles, Radio, RadioGroup, Theme } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { CONSTANTS } from '../constants';
import { Scenario } from '../models/scenario';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '1rem',
    },
  }),
);
type ScenariosProps = {
  onSelectedScenarioChange: (scenario: Scenario) => void;
}
const Scenarios: React.FC<ScenariosProps> = ({
  onSelectedScenarioChange,
}: ScenariosProps) => {
  const classes = useStyles();
  const [scenarios, setSenarios] = useState<Scenario[] | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  useEffect(() => {
    fetch(CONSTANTS.API_BASE_URL + '/scenarios', {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(async (response) => {
      if (response.status === 200) {
        const scenarioListJson = await response.json() as Scenario[];
        setSenarios(scenarioListJson);
        if (scenarioListJson.length > 0) {
          updateScenario(scenarioListJson[0]);
        }
      } else {
        setSenarios(null);
      }
    })
  }, []);

  const updateScenario = (scenario: Scenario | null) => {
    setSelectedScenario(scenario);
    if (scenario !== null) {
      onSelectedScenarioChange(scenario);
    }
  }

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
      </Grid>
    </div>
  );
}

export default Scenarios;
