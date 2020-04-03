import * as React from "react";
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {CardProps} from "@material-ui/core";

const defaultProps = {
    bgcolor: 'background.paper',
    borderColor: 'text.primary',
    m: 1,
    border: 1,
};

type BubbleProps = {
    msg: string,
    timeStamp: string,
    user: string,
    position: string
}

export const TextBubble = ({msg, timeStamp, user, position}: BubbleProps) => <aside>
    <div>
        <Box display="flex" flexDirection={ position } p={1} borderRadius={16} {...defaultProps}>
            { user } ( {timeStamp} ): { msg }
        </Box>
    </div>
</aside>