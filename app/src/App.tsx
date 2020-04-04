import React, {useState, useEffect} from 'react';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";
import Box from '@material-ui/core/Box';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Slide} from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';
import {useLocalStorage} from './hooks/useLocalStorage';
import Header from './components/Header';
import {API_ORIGIN} from './config'
import './App.css';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
    const updateInMs = 1000
    const [data, setData] = useState(new Array())
    const [user, setUser] = useLocalStorage("username", "");
    const [tmpUser, setTmpUser] = useState("")
    const [usernameError, setUsernameError] = useState("");
    const open = user === ""

    useEffect(() => {
        async function getData(){
            const res = await fetch(API_ORIGIN)
            setData(await res.json());
            window.scrollTo(0,document.body.scrollHeight);
        }

        const polling = setInterval(getData, updateInMs)
        return () => clearInterval(polling)
    }, [])

    async function sendMsg(msg: string) {
        const res = await fetch(`${API_ORIGIN}/message`,
            {method: "Post", body: JSON.stringify({Message: msg, Username: user})
        })
    }

    const handleClose = () => {
        if (tmpUser === 'unknown' || tmpUser === '') {
            setUsernameError('Please set a username');
            return;
        } else {
            setUser(tmpUser)
        }
    };

    const logout = () => setUser("")

    return (
        <div className="App">
            <Header logout={logout} user={user}/>
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
                             setTmpUser(event.target.value);
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
