import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";
import Grid from '@material-ui/core/Grid';

function App() {
    const [data, setData] = useState(new Array())
    const [i, setI] = useState(0);

    useEffect(() => {
        async function getData(){
            const res = await fetch("http://localhost:8080")
            setData(await res.json());
        }
        getData()
        window.scrollTo(0,document.body.scrollHeight);
    }, [i])

    async function sendMsg(msg: string) {
        const res = await fetch("http://localhost:8080/message",
            {method: "Post", body: JSON.stringify({Message: msg, Username: "ich"})})
        setI(i + 1);
    }

    return (
    <div className="App">
        <ChatLayout data={data} />
        <InputBar sendMsg={sendMsg}/>
    </div>
);
}

export default App;
