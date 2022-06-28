import { ActionType } from '../../types';

const InitState = {
    active: '',
    pause: false,
    volume: 0.5,
    duration: 0,
    currentTime: 0,
}

const playerReducer = (state = InitState, action: ActionType) => {
    switch(action.type) {
        case 'PAUSE':
            return {...state, pause: true};
        case 'PLAY':
            return {...state, pause: false};
        case 'SET_ACTIVE_TRACK':
            return {...state, active: action.payload};
        case 'SET_VOLUME':
            return {...state, volume: action.payload};
        case 'SET_DURATION':
            return {...state, duration: action.payload};
        case 'SET_CURRENT_TIME':
            return {...state, currentTime: action.payload};
        default:
            return state;
    }
}

export default playerReducer;