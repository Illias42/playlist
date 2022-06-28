import React from 'react';
import { IconButton, Box, Theme } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Pause, PlayArrow } from '@material-ui/icons';
import TrackSlider from './TrackSlider';
import VolumeSlider from './VolumeSlider';
import { VolumeUp, VolumeDown, VolumeMute } from '@material-ui/icons';
import { useActions } from '../hooks/useActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { IRootState } from '../types/state';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        position: 'fixed',
        bottom: 0,
        backgroundColor: theme.palette.primary.main,
        alignItems: 'center',
        margin: 0,
        height: '60px',
    },
    margin: {
        height: 20,
    },
    accessories: {
      color: theme.palette.text.secondary,
    },
    volume: {
      display: 'flex',
      flexDirection: 'row',
      marginRight: 15,
    },
    slider: {
      display: 'flex',
      flex: 1,
    },
    timer: {
      margin: 10,
      width: 100,
    }
  }),
);

let audio: HTMLAudioElement;

const Player = () => {
    const classes = useStyles();
    const { setVolume, setDuration, setCurrentTime, playTrack, pauseTrack } = useActions();
    const { active, pause, volume, duration, currentTime } = useSelector((state: IRootState) => state.player);

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100;
      setVolume(Number(e.target.value) / 100);
    }

    const handleCurrentTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = duration * (Number(e.target.value) / 100);
      setCurrentTime(duration * (Number(e.target.value) / 100))
    }

    const play = () => {
      if(!pause) {
        audio.pause()
        pauseTrack();
      } else {
        audio.play();
        playTrack();
      }
    }

    useEffect(() => {
      if(!audio) {
        audio = new Audio();
      }
      audio.src = active;
      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      }
      audio?.play();

      return () => {audio.src = ''}
    }, [active]);

    useEffect(() => {
      if(audio) {
          audio.volume = volume;
      };
    }, [volume]);

    useEffect(() => {
      if(audio) {
        if(pause) {
          audio?.pause();
        } else {
          audio?.play();
        }
      }
    }, [pause]);

    return (
      <>
      {active !== '' &&
        <Box className={classes.root}>
            <IconButton onClick={play}>
              {
                pause ? <PlayArrow className={classes.accessories} /> : <Pause className={classes.accessories} />
              }
            </IconButton>
            <Box className={classes.slider}>
              <TrackSlider onChange={handleCurrentTimeChange} />
              <Box className={classes.timer}>
                {duration !== 0 &&
                <>
                {(currentTime / 60).toFixed(0)}.{(currentTime % 60).toFixed(0)} / {(duration / 60).toFixed(0)}.{(duration % 60).toFixed(0)}
                </>
                }
              </Box>
            </Box>
            <Box className={classes.volume}>
                {volume >= 0.7 &&
                  <VolumeUp />
                }
                {volume < 0.7 && volume !== 0 &&
                  <VolumeDown />
                }
                {volume === 0 &&
                  <VolumeMute />
                }
                <VolumeSlider onChange={handleVolumeChange} />
            </Box>
        </Box>
      }
      </>
    )
}

export default Player;