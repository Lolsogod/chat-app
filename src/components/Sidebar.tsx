import ChatItem from "./ChatItem";
import { useEffect, useState } from "react";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";


export default function SideBar({setSelected, selected, user, connectWS, client, setUser}: any) {
  
  
  const { keycloak } = useKeycloak()
  
  const [userList, setUserList] = useState([]);
  
  const addUser = async () =>{
    await chatApi.registerTemp(keycloak.token ,user)
      .then(() => {
        connectWS()
        refresh()
      })
  }

  const refresh = async ()=>{
    await chatApi.fetchUsers(keycloak.token)
      .then((res)=>setUserList(res.data))
  }
  //test

  
    //test-end
  useEffect(()=>{
    refresh()
  },[])
  
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
      <input type="text" value={user} onChange={(e) => setUser(e.target.value)}></input>
        <button onClick={addUser}>add user</button>
        <button onClick={refresh}>refresh</button>
        {userList.map((usr, i) => (
          <ChatItem key={i} name={usr} setSelected={setSelected} selected={selected}/>
        ))}
    </div>
  )
}