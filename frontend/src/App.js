import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar.js";
import Chat from "./Chat";
import Pusher from "pusher-js";
import axios from "./axios";

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
      // console.log(response.data);
      setMessage(response.data);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher("f70647acbe7ac7197d07", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      // alert(JSON.stringify(data));
      setMessage([...message, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [message]);

  // console.log(message)

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat message={message} />
      </div>
    </div>
  );
}

export default App;
