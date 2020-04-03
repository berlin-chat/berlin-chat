import * as React from "react";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(16),
            },
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
    return (
        <aside>
            <div>
                <Box display="flex" flexDirection={ position } p={1} {...useStyles}>
                    <Paper color="primary" elevation={3}>
                        { user } ({date.getHours()}:{date.getMinutes()}): { msg }
                    </Paper>
                </Box>
            </div>
        </aside>
    );
}