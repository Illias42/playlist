import {AppBar, Toolbar, IconButton} from "@material-ui/core"
import { useRouter } from "next/dist/client/router";
import { PlayCircleFilled } from '@material-ui/icons';

const Navbar = () => {
    const router = useRouter();

    return (
        <div>
            <AppBar
                color="primary"
                position="fixed"
            >
                <Toolbar>
                    <IconButton color="secondary" onClick={() => router.push("/tracks")}>
                        <PlayCircleFilled />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar;