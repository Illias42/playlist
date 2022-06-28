//@ts-nocheck
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Grid, Card, TextField, Box, IconButton } from '@material-ui/core';
import MainLayout from '../../layouts/MainLayout';
import FileUploader from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    descForm: {
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 20%',
    },
    input: {
      marginBottom: '20px',
    },
    uploadStep: {
      backgroundColor: theme.palette.primary.light,
      display: 'flex',
      justifyContent: 'center',
      height: 200,
      alignItems: 'center',
    },
    container: {
      backgroundColor: theme.palette.primary.light,
    },
    stepper: {
      width: '100%',
      backgroundColor: theme.palette.primary.light,
    },
    head: {
      display: 'flex',
      justifyContent: 'space-around',
    }
  }),
);

function getSteps() {
  return ['Describe track', 'Upload picture', 'Upload track'];
}


export default function TrackCreator() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [audio, setAudio] = React.useState(null);
  const [picture, setPicture] = React.useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const steps = getSteps();
  const router = useRouter();

  const handleNext = () => {
    if ( activeStep !== 2 ) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      const formData = new FormData();
      formData.append('name', name.value);
      formData.append('artist', artist.value);
      formData.append('text', text.value);
      formData.append('audio', audio);
      formData.append('picture', picture);
      axios.post('http://localhost:5000/tracks', formData)
                .then(() => router.push('/tracks'))
                .catch(e => console.log(e))
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
        <MainLayout>
          <Box className={classes.container}>
            <Stepper className={classes.stepper} activeStep={activeStep} alternativeLabel>
              {steps.map((label, index) => {
                return (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {activeStep === 0 &&
              <Card className={classes.descForm}>
                  <TextField color="secondary" className={classes.input} {...name} label="Name" variant={"outlined"} />
                  <TextField color="secondary" className={classes.input} {...artist} label="Artist" variant={"outlined"} />
                  <TextField multiline maxRows={6} color="secondary" className={classes.input} {...text} label="Text" variant={"outlined"} />
              </Card>
            }
            {activeStep === 1 &&
              <Card className={classes.uploadStep}>
                  <FileUploader setFile={setPicture} accept="image/*"/>
              </Card>
            }
            {activeStep === 2 &&
              <Card className={classes.uploadStep}>
                  <FileUploader setFile={setAudio} accept="audio/*"/>
              </Card>
            }
            <Grid justifyContent="space-between" style={{padding: '10px 25px'}} container>
              <Grid item>
                  <Button variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
                      Back
                  </Button>
              </Grid>
              <Grid item>
                  <Button variant="contained" color="secondary" onClick={handleNext}>
                      Next
                  </Button>
              </Grid>
            </Grid>
          </Box>
        </MainLayout>
    </div>
  );
}

