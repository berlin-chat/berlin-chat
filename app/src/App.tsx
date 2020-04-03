import React, {useState, useEffect} from 'react';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles, createStyles, Theme, Slide} from "@material-ui/core";

import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: "100%",
        },
        sendButton: {
            width: "100%",
        }
    }),
);

function App() {
    const [data, setData] = useState(new Array())
    const [i, setI] = useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState("unknown");
    const [usernameError, setUsernameError] = useState("");

    useEffect(() => {
        async function getData(){
            const res = await fetch("http://localhost:8080")
            setData(await res.json());
            window.scrollTo(0,document.body.scrollHeight);
            if(i == 0){
                handleClickOpen();
            }
        }
        getData()
    }, [i])

    async function sendMsg(msg: string) {
        const res = await fetch("http://localhost:8080/message",
            {method: "Post", body: JSON.stringify({Message: msg, Username: user})})
        setI(i + 1);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        if (user === 'unknown' || user === '') {
            setUsernameError('Please set a username');
            return;
        }

        setOpen(false);
    };

    return (
        <div className="App">
            <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-start"
                p={1}
                m={1}
            >
            <ChatLayout data={data} localUser={user} />
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-end"
                p={1}
                m={1}
                css={{ height: 50 }}>
            <InputBar sendMsg={sendMsg}/>
            </Box>
            <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted aria-labelledby="Username">
                <DialogTitle id="simple-dialog-title">Set username</DialogTitle>
                <DialogContent>
                    <TextField
                        id="outlined-basic"
                        label="Enter Username ..."
                        error={!!usernameError}
                        helperText={usernameError}
                        onChange={(event) => {
                            setUser(event.target.value);
                        }}
                        onKeyUp={(event) => {
                            if (event.key === 'Enter') {
                                handleClose();
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default App;
