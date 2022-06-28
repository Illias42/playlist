import { createTheme } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#242424",
            light: '#2d2d2d',
        },
        secondary: {
            main: "#009d12",
        },
        text: {
            primary: "#cbcbcb",
            secondary: "#a2a2a2",
        },
        background: {
            default: "#161616",
        }
    },
    typography: {
        fontFamily: 'Roboto',
    },
    overrides: {
        MuiStepIcon: {
            root: {
                ['&$completed']: {
                    color: '#00820d',
                },
                ['&$active']: {
                    color: '#009d12',
                },
            }
        },
    }
});

export default theme;