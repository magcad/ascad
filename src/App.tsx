import React, { useState } from 'react';
import './App.css';
import { Button, createStyles, Grid, Paper, makeStyles, Step, StepLabel, Stepper, Theme, Typography } from '@material-ui/core';
import FileDropper from './components/FileDropper';
import Scenarios from './components/Scenarios';
import { Scenario } from './models/scenario';

const getSteps = (): string[] => {
  return ['Select CAD file(s)', 'Choose scenario', 'Get your files'];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '50%',
      minWidth: '50rem',
      padding: theme.spacing(2),
    },
    steps: {
      width: '90%',
    },
    contentContainer: {
      minHeight: '20rem',
      minWidth: '50rem',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

function App() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<File[] | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((previousStep) => previousStep + 1);
  }

  const handleBack = () => {
    setActiveStep((previousStep) => previousStep - 1);
  }

  const handleReset = () => {
    setActiveStep(0);
  }

  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
  }

  const handleSelectedScenarioChange = (scenario: Scenario) => {
    setSelectedScenario(scenario);
  }

  const canProceedToNextStep = (): boolean => {
    switch (activeStep) {
      case 0:
        return (files !== null && files.length > 0);
      case 1:
        return selectedScenario !== null;
      default:
        return true;
    }
  }

  const getStepContent = (stepIndex: number): React.ReactNode => {
    switch (stepIndex) {
      case 0:
        return <div>
            <FileDropper onFileUpload={handleFileUpload} />
            <ul>
              {files !== null && files.map(file => 
                <li>{file.name}</li>  
              )}
            </ul>
          </div>
      case 1:
        return <Scenarios onSelectedScenarioChange={handleSelectedScenarioChange} />
      case 2:
        return <div>download files</div>;
      default:
        return <div>Unknown stepIndex</div>;
    }
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Paper className={classes.paper}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Typography variant="h4">
            ASCAD
          </Typography>
          <Typography variant="h6">
            Simplify and Convert
          </Typography>
          <Stepper
            className={classes.steps}
            activeStep={activeStep}
            alternativeLabel
          >
            {steps.map((stepLabel) =>
              <Step key={stepLabel}>
                <StepLabel>
                  {stepLabel}  
                </StepLabel>
              </Step>
            )}
          </Stepper>
          <div className={classes.contentContainer}>
            {getStepContent(activeStep)}
          </div>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          {activeStep === steps.length ? (
            <Button 
              onClick={handleReset}
              size="large"
            >
              Restart
            </Button>
          ) : (
              <div>
                <Button
                  disabled={activeStep === 0}
                  size="large"
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleNext}
                  disabled={!canProceedToNextStep()}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default App;
