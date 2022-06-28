import { ActionType } from '../../types';

const InitState = {
    tracks: []
};

const tracksReducer = (state = InitState, action: ActionType) => {
    switch(action.type) {
        case 'FETCH_TRACKS_SUCCESS':
            return {...state, tracks: action.payload};
        default:
            return state;
    }
}

export default tracksReducer;