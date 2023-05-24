import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";


export default function SideBar({setSelected, selected, user, connectWS, client, setUser}: any) {
  
  const getUsername = () => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }
  
  const { keycloak } = useKeycloak()
  
  const [userList, setUserList] = useState<any>([]);
  
  const addUser = async () =>{
    await chatApi.start(keycloak.token ,getUsername())
      .then(() => {
        connectWS()
        refresh()
      })
  }

  const refresh = async ()=>{
    await chatApi.fetchUsers(keycloak.token, getUsername())
      .then((res)=>setUserList(res.data))
  }
  
  useEffect(()=>{
    connectWS()
    refresh()
  },[])
  
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
        <button onClick={addUser}>add chat</button>
        <button onClick={refresh}>refresh</button>
        {userList.map((usr:any, i:number) => (
          <ChatItem key={i} name={usr.id} setSelected={setSelected} selected={selected}/>
        ))}
    </div>
  )
}