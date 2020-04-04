import * as React from 'react';
import {TextField, Button, Paper, Box} from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {useState} from "react";
import SendIcon from "@material-ui/icons/Send";
import { useMobile } from '../hooks/useMobile';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputBar: {
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
        },
    }),
);

type Props = {
    sendMsg: Function,
}

export default function InputBar({sendMsg}: Props) {
    const classes = useStyles();
    const [msg, setMsg] = useState("")
    const isSmallPhone = useMobile()

    const textField = isSmallPhone ? {} : {
        width: "80%",
    };

    const sendButton = isSmallPhone ? {} : {
        width: "20%",
    };

    function sendMessageAndClearInput() {
        if (msg.trim() === '') { setMsg(''); return; }

        sendMsg(msg);
        setMsg('');
    }

    return (
        <div className={classes.inputBar}>
            <Paper>
                <Box p={2} bgcolor="background.paper">
                    <TextField multiline style={textField} id="outlined-basic" label="Enter Message ..." value={msg} onChange={(event) => {
                        setMsg(event.target.value);
                    }} onKeyUp={(event) => {
                        if (event.key === 'Enter' && !event.getModifierState("Shift")) {
                            sendMessageAndClearInput();
                        }
                    }} />
                    <Button style={sendButton} color="primary" onClick={() => {
                        sendMessageAndClearInput();
                    }}>
                        <SendIcon/>
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}
