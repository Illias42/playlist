import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../types';
import styles from '../styles/TrackSlider.module.scss';

interface TrackSliderProps {
    onChange: (e: any) => void;
}

const TrackSlider = (props: TrackSliderProps) => {
    const { currentTime, duration } = useSelector((state: IRootState) => state.player);

    return (
        <input
            className={styles.slider}
            type='range'
            value={(currentTime / duration ) * 100}
            onChange={props.onChange}
        />
    )
}

export default TrackSlider;