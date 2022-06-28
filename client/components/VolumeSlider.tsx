import React from 'react';
import styles from '../styles/TrackSlider.module.scss';
import { useSelector } from 'react-redux';
import { IRootState } from '../types';

interface VolumeSliderProps {
    onChange: (e: any) => void;
}

const VolumeSlider: React.FC<VolumeSliderProps> = (props) => {
    const { volume } = useSelector((state: IRootState) => state.player);

    return (
        <input
            onChange={props.onChange}
            className={styles.slider}
            type='range'
            defaultValue={volume*100}
        />
    )
}

export default VolumeSlider;