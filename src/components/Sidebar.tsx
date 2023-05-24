import ChatItem from "./ChatItem";
import { useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function SideBar() {
  

  const { keycloak } = useKeycloak()
  
  const URL = 'http://127.0.0.1:9080/chat';
  const [user, setUser] = useState('John');
  
  const addUser = async () =>{
    await chatApi.registerTemp(keycloak.token ,user)
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

  const refresh = async ()=>{
    await chatApi.fetchUsers(keycloak.token)
      .then((res)=>console.log(res))
  }
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={addUser}>add user</button>
        <button onClick={refresh}>refresh</button>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
    </div>
  )
}