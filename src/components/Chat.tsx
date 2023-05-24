
import Messages from "./Messages"
import Input from "./Input"
import { useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function Chat() {
  const { keycloak } = useKeycloak()
  
  const URL = 'http://127.0.0.1:9080/chat';
  const [user, setUser] = useState('John');
  const [message, setMessage] = useState([]);
  const [messages, setMessages] = useState([]);
  //const [ws, setWs] = useState(new WebSocket(URL));
  /*
  const submitMessage = (usr: any, msg: any) => {
    const message = { user: usr, message: msg };
    ws.send(JSON.stringify(message));
    //@ts-ignore
    setMessages([message, ...messages]);
  }*/
  /*---*/
  const addUser = async () =>{
    await chatApi.registerTemp(user)
      .then(() => connectWS())
  }
  
  function connectWS() {
    const ws = new SockJS(`${URL}`);
  
    let client: Stomp.Client | null = Stomp.over(ws);
  
    client.connect({}, () => {
      client!.subscribe("/topic/messages/" + user, (mes: any) => {
        console.log(mes);
      });
    });
  }

  return (
    <div className="flex flex-col chat-c bg-slate-950 p-2 justify-end items-center">
        <input type="text" value={user} onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={addUser}>send</button>
        <Messages/>
        <Input/>
    </div>
  )
}