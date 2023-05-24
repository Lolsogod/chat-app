import { useEffect, useState } from "react"
import { getUsername } from "./api/Helpers"
import { useKeycloak } from "@react-keycloak/web"

export default function Input({user, sendMsg, selected, setMessages}: any) {
    const [text, setText] = useState('')
    const { keycloak } = useKeycloak()
    const sendHandler = ()=>{
      sendMsg(getUsername(keycloak), text)
      setMessages((messages: any) => [...messages, {from: user, message: text}])
      setText('')
    }
    return (
      <div className="mt-4">
         <input className="w-96 p-2 bg-slate-800 rounded-md mr-4" type="text"
         value={text} onChange={(e) => setText(e.target.value)} /> 
         <button className="btn" onClick={sendHandler}>Send</button>
      </div>
    )
  }