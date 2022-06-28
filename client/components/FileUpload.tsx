//@ts-nocheck
import { Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';

import React from 'react';

const useStyles = makeStyles(() => createStyles({
    uploadBtn: {
        height: 60,
        width: 150,
        fontSize: 30
    }
}));

interface FileUploaderProps {
    accept: string;
    setFile: Function;
}

const FileUploader: React.FC<FileUploaderProps> = ({accept, setFile}) => {
    const ref = React.useRef<HTMLInputElement>();
    const classes = useStyles();

    const onChange = (e: any) => {
        setFile(e.target.files[0]);
    }

    const inputClick = () => {
        ref.current?.click();
    }

    return (
        <div>
            <Button className={classes.uploadBtn} onClick={inputClick}>
                Upload
            </Button>
            <input
                ref={ref}
                style={{display: "none"}} 
                type='file'
                accept={accept}
                onChange={onChange}
            />
        </div>
    )
}

export default FileUploader;