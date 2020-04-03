import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import {useState} from "react";

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

    return (
        <div className={classes.inputBar}>
            <Paper color="Primary">
                <TextField className={classes.textField} id="outlined-basic" label="Enter Message ..." onChange={(event) => {
                    setMsg(event.target.value);
                }}/>
                <Button className={classes.sendButton} color="primary" onClick={() => {
                    sendMsg(msg);
                }}>
                    Send
                </Button>
            </Paper>
        </div>
    );
}
