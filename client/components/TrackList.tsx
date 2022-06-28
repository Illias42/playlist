import { Box } from "@material-ui/core";
import { ITrack } from "../types/tracks";
import TrackItem from "./TrackItem";

interface TrackListProps {
    tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({tracks}) => {
    return (
        <Box>
            {tracks.map((track, key) => <TrackItem key={key} track={track} />)}
        </Box>
    )
}

export default TrackList;