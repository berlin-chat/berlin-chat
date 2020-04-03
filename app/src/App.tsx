import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ChatLayout from "./components/ChatLayout";
import InputBar from "./components/InputBar";

function App() {
    const [data, setData] = useState(new Array())
    console.log("hey")

    useEffect(() => {
        async function getData(){
            const res = await fetch("http://localhost:8080")
            setData(await res.json());
        }
        getData()
    }, [])

    console.log(data);

  return (
    <div className="App">
      <ChatLayout data={data} />
      <InputBar />
    </div>
  );
}

export default App;
