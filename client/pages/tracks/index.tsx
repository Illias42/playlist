import { Grid, IconButton, Card, Box, Typography, TextField, Theme } from '@material-ui/core';
import { useRouter } from 'next/dist/client/router';
import { InputAdornment } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import TrackList from '../../components/TrackList';
import Empty from '../../components/Empty';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { connect, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../types';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Search } from '@material-ui/icons';
import { useActions } from '../../hooks/useActions';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        backgroundColor: theme.palette.primary.main
    },
    addBtn: {
        margin: '10px',
        width: 50,
        height: 50,
    },
    head: {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: 0,
        padding: "0 20px"
    },
    input: {
        width: '100%',
        height: 40,
        color: '#d4d2d2',
        backgroundColor: theme.palette.primary.light,
    }
}));

const Tracks = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { searchTracks } = useActions();
    const useTypedSelector: TypedUseSelectorHook<IRootState> = useSelector;
    const { playlist } = useTypedSelector(state => state);
    const classes = useStyles();

    useEffect(() => {
        dispatch({type: 'FETCH_TRACKS'});
    }, []);

    const search = (e: any) => {
        searchTracks(e.target.value);
    }

    return (
        <MainLayout>
            <Grid container justifyContent="center">
                <Card className={classes.root} style={{width: '80%'}}>
                    <Box className={classes.head}>
                            <TextField
                                fullWidth
                                onChange={e => search(e)}
                                variant="outlined" 
                                color="secondary" 
                                InputProps={{
                                    className: classes.input,
                                    startAdornment: (
                                        <InputAdornment position="start">
                                          <Search />
                                        </InputAdornment>
                                    ),
                                }}    
                            />
                            <IconButton className={classes.addBtn} size="medium" color="secondary" onClick={() => router.push('/tracks/create')}>
                                <AddCircleIcon fontSize="large" />
                            </IconButton>
                    </Box>
                    {playlist.tracks.length ?
                        <TrackList tracks={playlist.tracks} />
                        :
                        <Empty />
                    }
                </Card>
            </Grid>
        </MainLayout>
    )
}

export default connect()(Tracks);