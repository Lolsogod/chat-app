import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";
import SockJS from 'sockjs-client';
import Stomp, { Client } from 'stompjs';

export default function SideBar({setSelected, selected}: any) {
  
  const [client, setClient] = useState<Stomp.Client | null>()
  const { keycloak } = useKeycloak()
  
  const URL = 'http://127.0.0.1:9080/chat';
  const [user, setUser] = useState('John');
  const [userList, setUserList] = useState([]);
  
  const addUser = async () =>{
    await chatApi.registerTemp(keycloak.token ,user)
      .then(() => {
        connectWS()
        refresh()
      })
  }
  
  const connectWS = async ()=> {
    const ws = new SockJS(`${URL}`);
  
    await setClient(Stomp.over(ws))
    console.log(client)
  }

  const refresh = async ()=>{
    await chatApi.fetchUsers(keycloak.token)
      .then((res)=>setUserList(res.data))
  }
  //test

  function sendMsg(from: any, text: any) {
    client!.send("/app/chat/" + selected, {}, JSON.stringify({
        fromLogin: from,
        message: text
    }));
  }
    //test-end
  useEffect(()=>{
    refresh()
  },[])
  useEffect(()=>{
    console.log("----------------")
    console.log(client)
    if (client){
      client!.connect({}, () => {
      client!.subscribe("/topic/messages/" + user, (mes: any) => {
        console.log(mes);
      });
    });
    }
    
  },[client])
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={addUser}>add user</button>
        <button onClick={refresh}>refresh</button>
        <button onClick={() => sendMsg(user, "hi")}>say hi</button>
        {userList.map((usr, i) => (
          <ChatItem key={i} name={usr} setSelected={setSelected} selected={selected}/>
        ))}
    </div>
  )
}