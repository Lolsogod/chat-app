import { useEffect, useState } from "react"
import { getUsername } from "./api/Helpers"
import { useKeycloak } from "@react-keycloak/web"
import { chatApi } from "./api/ChatApi"

export default function Input({user, sendMsg, selected, setMessages}: any) {
    const [text, setText] = useState('')
    const [chatInfo, setChatInfo] = useState<any>()

    const { keycloak } = useKeycloak()

    const sendHandler = ()=>{
      sendMsg(getUsername(keycloak), text)
      //setMessages((messages: any) => [...messages, {senderId: getUsername(keycloak), text}])
      setText('')
    }

    const resHandler = () =>{
      chatApi.reserveChat(keycloak.token, selected, getUsername(keycloak))
      fetchData()
    }

    const fetchData = async ()=>{
       chatApi.getChatInfo(keycloak.token, selected).then((res)=>  setChatInfo(res.data))
     }

    useEffect(()=>{
      fetchData()
    }, [selected])
    useEffect(()=>{
        console.log(chatInfo)
    }, [chatInfo])
    return (
      <div className="mt-4">
         {chatInfo && chatInfo.chatStatus == "ON_FIRST_LINE" && <><input className="w-96 p-2 bg-slate-800 rounded-md mr-4" type="text"
         value={text} onChange={(e) => setText(e.target.value)} /> 
         <button className="btn" onClick={sendHandler}>Send</button></> }
         {chatInfo && chatInfo.chatStatus == "PENDING_ON_FIRST_LINE" &&<button className="btn" onClick={resHandler}>Reserve</button>}
      </div>
    )
  }