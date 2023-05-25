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
    if (await roleParser(keycloak).includes("USER"))
      await chatApi.fetchUsers(keycloak.token, getUsername()).then((res)=>setUserList(res.data))
    else
      await chatApi.availableChats(keycloak.token, getUsername(),roleParser(keycloak)[0] ).then((res)=>setUserList(res.data))
      
  }
  
  useEffect(()=>{
    connectWS()
    refresh()
  },[])

  useEffect(() => {
    const interval = setInterval(() => {
      refresh()
    }, 2000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])
  
  return (
    <div className="flex flex-1 flex-col p-2 gap-2 overflow-y-scroll bg-slate-950 sideb">
        {roleParser(keycloak) && roleParser(keycloak).includes("USER") && <button className="btn" onClick={addUser}>add chat</button>}
        <button className="btn" onClick={refresh}>refresh</button>
        {userList.map((usr:any, i:number) => (
          <ChatItem key={i} id={usr.id} status={usr.chatStatus} setSelected={setSelected} selected={selected}/>
        ))}
    </div>
  )
}