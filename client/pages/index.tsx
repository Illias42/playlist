import type { NextPage } from 'next';
import MainLayout from '../layouts/MainLayout';
import { Button, Fade, Typography, Box } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { createStyles, makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => createStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    marginTop: '18%',
    marginBottom: 30,
  },
}))

const Home: NextPage = () => {
  const router = useRouter();
  const classes = useStyles();

  return (
    <MainLayout>
      <Box className={classes.root}>
        <Fade in={true} timeout={1000}>
          <Typography className={classes.title} variant="h1">
            Welcome
          </Typography>
        </Fade>
        <Fade in={true} timeout={2500}>
          <Button size="large" color="secondary" variant="contained" onClick={() => router.push('/tracks')}>
            <Typography>Go to playlist</Typography>
          </Button>
        </Fade>
      </Box>
    </MainLayout>
  )
}

export default Home
