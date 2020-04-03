import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";

function App() {
    const [data, setData] = useState({})
    console.log("hey")

    useEffect(() => {
        async function getData(){
            const res = await fetch("http://localhost:8080")
            console.log(res)
        }
        getData()
    }, [])

  return (
    <div className="App">
    <ChatLayout/>
      <InputBar />
    </div>
  );
}

export default App;
