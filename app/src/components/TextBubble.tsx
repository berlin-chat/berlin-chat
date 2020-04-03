import * as React from "react";
import Box from '@material-ui/core/Box';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bubble: {
            padding: 5
        },
    }),
);

type BubbleProps = {
    msg: string,
    timeStamp: string,
    user: string,
    position: string
}

export default function TextBubble({msg, timeStamp, user, position}: BubbleProps) {
    const date = new Date(timeStamp);
    const classes = useStyles();
    return (
        <aside>
            <Box p={1} display="flex" flexDirection={ position } bgcolor="background.paper">
                <Paper className={classes.bubble} color="primary" elevation={3}>
                    { user } ({date.getHours()}:{date.getMinutes()}): { msg }
                </Paper>
            </Box>
        </aside>
    );
}