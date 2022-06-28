import { Card, IconButton, Grid, Box, Theme } from "@material-ui/core";
import { ITrack } from "../types/tracks";
import { Delete, Pause, PlayArrow } from "@material-ui/icons";
import { useRouter } from "next/dist/client/router";
import { useSelector } from "react-redux";
import { useActions } from "../hooks/useActions";
import { IRootState } from "../types/state";
import axios from 'axios';
import { makeStyles, createStyles } from "@material-ui/styles";


const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.primary.light,
        padding: 15,
        margin: 10,
        display: 'flex',
        alignItems: 'center',
        ['&:hover']: {
            cursor: 'pointer',
        }
    },
    accessories: {
        color: theme.palette.text.secondary,
    },
    timer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: 150,
        paddingRight: 20,
    }
}))

interface TrackItemProps {
    track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({track}) => {
    const { active, duration, currentTime, pause } = useSelector((state: IRootState) => state.player);
    const { setActiveTrack, playTrack, pauseTrack } = useActions();
    const { fetchTracks } = useActions();
    const router = useRouter();
    const classes = useStyles();

    const setActive = (e: any) => {
        e.stopPropagation();
        if(active !== track.audio || active === "") {
            setActiveTrack(track.audio);
            playTrack();
        } else {
            if(!pause) {
                pauseTrack();
            } else {
                playTrack();
            }
        }
    }

    const deleteTrack = (e: any) => {
        e.stopPropagation();
        axios.delete(`http://localhost:5000/tracks/${track._id}`)
             .then(() => fetchTracks())
    }

    return (
        <Card className={classes.root} onClick={() => {router.push('/tracks/' + track._id)}}>
            <IconButton onClick={setActive}>
                {active == track.audio && !pause ? <Pause className={classes.accessories} /> : <PlayArrow className={classes.accessories} />}
            </IconButton>
            <img onClick={(e) => e.stopPropagation()} style={{objectFit: 'cover'}} width={60} height={60} src={track.picture} />
            <Grid container direction="column" style={{marginLeft: '10px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'gray'}}>{track.artist}</div>
            </Grid>
            <Box className={classes.timer}>
                {active == track.audio && <div>{(currentTime / 60).toFixed(0)}.{(currentTime % 60).toFixed(0)} / {(duration / 60).toFixed(0)}.{(duration % 60).toFixed(0)}</div>}
            </Box>
            <IconButton onClick={(e) => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete onClick={deleteTrack} className={classes.accessories} />
            </IconButton>
        </Card>
    )
}

export default TrackItem;