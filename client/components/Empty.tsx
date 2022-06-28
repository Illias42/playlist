import { Box, Theme, Typography } from "@material-ui/core";
import { makeStyles, createStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
      backgroundColor: theme.palette.primary.light,
      height: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
  }
}));

const Empty = () => {
    const classes = useStyles();

    return (
      <Box className={classes.root}>
        <Typography variant="h4" align="center">
          Empty
        </Typography>
      </Box>
    )
}

export default Empty;