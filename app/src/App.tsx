import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";
import Box from '@material-ui/core/Box';

function App() {
    const [data, setData] = useState(new Array())
    const [i, setI] = useState(0);

    useEffect(() => {
        async function getData(){
            const res = await fetch("http://localhost:8080")
            setData(await res.json());
            window.scrollTo(0,document.body.scrollHeight);
        }
        getData()
    }, [i])

    async function sendMsg(msg: string) {
        const res = await fetch("http://localhost:8080/message",
            {method: "Post", body: JSON.stringify({Message: msg, Username: "ich"})})
        setI(i + 1);
    }

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
        </div>
    );
}

export default App;
