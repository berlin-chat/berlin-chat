import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {useState} from "react";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputBar: {
            width: "100%",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
        },
        textField: {
            width: "80%",
        },
        sendButton: {
            width: "20%",
        }
    }),
);

type Props = {
    sendMsg: Function,
}

export default function InputBar({sendMsg}: Props) {
    const classes = useStyles();
    const [msg, setMsg] = useState("")

    function sendMessageAndClearInput() {
        sendMsg(msg);
        setMsg('');
    }

    return (
        <div className={classes.inputBar}>
            <Paper>
                <Box p={2} bgcolor="background.paper">
                    <TextField multiline className={classes.textField} id="outlined-basic" label="Enter Message ..." value={msg} onChange={(event) => {
                        setMsg(event.target.value);
                    }} onKeyUp={(event) => {
                        if (event.key === 'Enter' && !event.getModifierState("Shift")) {
                            sendMessageAndClearInput();
                        }
                    }} />
                    <Button className={classes.sendButton} color="primary" onClick={() => {
                        sendMessageAndClearInput();
                    }}>
                        <SendIcon/>
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}
