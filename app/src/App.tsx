import React, {useState, useEffect} from 'react';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {makeStyles, createStyles, Theme} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textField: {
            width: "80%",
        },
        sendButton: {
            width: "20%",
        }
    }),
);

function App() {
    const [data, setData] = useState(new Array())
    const [i, setI] = useState(0);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = useState("unkown");

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
                bgcolor="background.paper"
            >
            <ChatLayout data={data} />
            </Box>
            <Box
                display="flex"
                flexWrap="wrap"
                alignContent="flex-end"
                p={1}
                m={1}
                bgcolor="background.paper"
                css={{ height: 50 }}>
            <InputBar sendMsg={sendMsg}/>
            </Box>
            <Dialog open={open} onClose={handleClose} aria-labelledby="Username">
                <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
                <Paper color="Primary">
                    <Box p={2} bgcolor="background.paper">
                        <TextField className={classes.textField} id="outlined-basic" label="Enter Username ..." onChange={(event) => {
                            setUser(event.target.value);
                        }}/>
                        <Button className={classes.sendButton} color="primary" onClick={() => {
                            handleClose();
                        }}>
                            confirm
                        </Button>
                    </Box>
                </Paper>
            </Dialog>
        </div>
    );
}

export default App;
