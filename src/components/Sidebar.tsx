import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";
import { roleParser } from "./api/Helpers";


export default  function SideBar({setSelected, selected, user, connectWS, client, setUser, userList, setUserList}: any) {
  
  const getUsername = () => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }
  
  const { keycloak } = useKeycloak()
  
  const [manager, setManager] = useState()
  
  const addUser = async () =>{
    await chatApi.start(keycloak.token ,getUsername())
      .then(() => {
        //connectWS()
        refresh()
      })
  }

  const refresh = async ()=>{
    if (await roleParser(keycloak).includes("CHAT_MANAGER"))
      await chatApi.availableChats(keycloak.token, getUsername(),roleParser(keycloak)[0] ).then((res)=>setUserList(res.data))
    else
      await chatApi.fetchUsers(keycloak.token, getUsername()).then((res)=>setUserList(res.data))
  }
  
  useEffect(()=>{
    connectWS()
    refresh()
  },[])


  
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
        {roleParser(keycloak) && !roleParser(keycloak).includes("CHAT_MANAGER") && <button onClick={addUser}>add chat</button>}
        <button onClick={refresh}>refresh</button>
        {userList.map((usr:any, i:number) => (
          <ChatItem key={i} id={usr.id} status={usr.chatStatus} setSelected={setSelected} selected={selected}/>
        ))}
    </div>
  )
}