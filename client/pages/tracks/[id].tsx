import { Grid, Typography } from '@material-ui/core';
import axios from 'axios';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/tracks';

function TrackPage({track}: any) {
    return (
        <MainLayout>
            {track &&
                <div>
                    <Grid container>
                        <img style={{ borderRadius: '50%', objectFit: 'cover', marginRight: 40}} width={200} height={200} src={track.picture}/>
                        <div>
                            <Typography variant="h2">{track.name}</Typography>
                            <Typography style={{color: "#a2a2a2"}} variant="h4">{track.artist}</Typography>
                        </div>
                    </Grid>
                    <Typography style={{marginTop: 35}}>
                        {track.text}
                    </Typography>
                </div>
        }
        </MainLayout>
    )
}

export async function getServerSideProps(context: any) {
    console.log(context.query);
    const { id } = context.query;
    const response = await axios.get(`http://localhost:5000/tracks/${id}`);
    const track = response.data;
    console.log(track);
    return {
        props: {
            track
        }
    }
}

export default TrackPage;