import { Container, createStyles, makeStyles, Box } from "@material-ui/core";
import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

const useStyles = makeStyles((theme) => createStyles({
    container: {
        marginTop: 90,
    }
}))


const MainLayout: React.FC = ({children}: any) => {
    const classes = useStyles();

    return (
        <div>
            <Navbar />
            <Container className={classes.container}>
                {children}
            </Container>
            <Player />
        </div>
    )
}

export default MainLayout;