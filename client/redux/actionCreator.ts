import { ITrack } from "../types";
import { ActionType } from "../types"

export const setActiveTrack = (track: string): ActionType => ({type: 'SET_ACTIVE_TRACK', payload: track, duration: 0, currentTime: 0});
export const pauseTrack = (): ActionType => ({type: 'PAUSE'});
export const playTrack = (): ActionType => ({type: 'PLAY'});
export const setVolume = (volume: number): ActionType => ({type: 'SET_VOLUME', payload: volume});
export const setDuration = (duration: number): ActionType => ({type: 'SET_DURATION', payload: duration});
export const setCurrentTime = (currentTime: number): ActionType => ({type: 'SET_CURRENT_TIME', payload: currentTime});

export const fetchTracks = (): ActionType => ({type: 'FETCH_TRACKS'})
export const searchTracks = (query: string): ActionType => ({type: 'SEARCH_TRACKS', payload: query})
export const fetchTracksSuccess = (tracks: ITrack[]): ActionType => ({type: 'FETCH_TRACKS_SUCCESS', payload: tracks})