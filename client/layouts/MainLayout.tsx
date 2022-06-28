import { Container } from "@mui/material";
import React from "react";
import Navbar from "../components/Navbar";
import Player from "../components/Player";

const MainLayout = ({children}: any) => {
    return (
        <div>
            <Navbar />
            <Container>
                {children}
            </Container>
            <Player />
        </div>
    )
}

export default MainLayout;