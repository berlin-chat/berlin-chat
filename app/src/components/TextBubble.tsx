import * as React from "react";
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {CardProps} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({

    }),
);

type BubbleProps = {
    msg: string,
    timeStamp: string,
    user: string,
    position: string
}

export const TextBubble = ({msg, timeStamp, user, position}: BubbleProps) => <aside>
    <div>
        <Box display="flex" flexDirection={ position } p={1} m={1} bgcolor="background.paper">
            { user } ( {timeStamp} ): { msg }
        </Box>
    </div>
</aside>