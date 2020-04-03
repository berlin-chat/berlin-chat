import * as React from "react";
import Box from '@material-ui/core/Box';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import cyan from '@material-ui/core/colors/cyan';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        bubblePrimary: {
            padding: 5,
            whiteSpace: 'pre-wrap',
            color: "#FFFFFF",
            background: cyan[500],
            maxWidth: '80%',
            overflow: 'hidden'
        },
        bubbleSecondary: {
            padding: 5,
            whiteSpace: 'pre-wrap',
            background: cyan[50],
            maxWidth: '80%',
            overflow: 'hidden'
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
    const colorClass = position === "row" ? classes.bubbleSecondary: classes.bubblePrimary;
    return (
        <aside>
            <Box p={1} display="flex" flexDirection={ position }>
                <Paper className={colorClass} elevation={3}>
                    { user } ({("0" + date.getHours()).slice(-2)}:{("0" + date.getMinutes()).slice(-2)}): { msg }
                </Paper>
            </Box>
        </aside>
    );
}