import { useEffect, useState } from "react"
import { getUsername, roleParser } from "./api/Helpers"
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
    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    } 
    const resHandler = async() =>{
      chatApi.reserveChat(keycloak.token, selected, getUsername(keycloak))
      await delay(1000)
      fetchData()
    }

    const fetchData = async ()=>{
       chatApi.getChatInfo(keycloak.token, selected).then((res)=>  setChatInfo(res.data))
     }


     const redirectHandler = (redirectManager: String) =>{
        chatApi.redirectChat(keycloak.token, selected, redirectManager)
        window.location.reload();
     }
    useEffect(()=>{
      fetchData()
    }, [selected])
    useEffect(()=>{
        console.log(chatInfo)
    }, [chatInfo])
    if(roleParser(keycloak) && roleParser(keycloak).includes("USER")){
      return (
      <div className="mt-4">
        <input className="w-96 p-2 bg-slate-800 rounded-md mr-4" type="text"
         value={text} onChange={(e) => setText(e.target.value)} /> 
         <button className="btn" onClick={sendHandler}>Send</button>
      </div>)
    }
    else if(roleParser(keycloak)){
      return (<div className="mt-4">
         {chatInfo && chatInfo.chatStatus == "ON_FIRST_LINE" && <><input className="w-96 p-2 bg-slate-800 rounded-md mr-4" type="text"
         value={text} onChange={(e) => setText(e.target.value)} /> 
         <button className="btn" onClick={sendHandler}>Send</button>
         <br />
         <button className="btn m-2" onClick={()=>redirectHandler("EXPENSE_MANAGER,")}>EXPENSE</button>
         <button className="btn m-2" onClick={()=>redirectHandler("FACTORING_MANAGER")}>FACTORING</button>
         <button className="btn m-2" onClick={()=>redirectHandler("GUARANTEES_MANAGER")}>GUARANTEES</button>
         <button className="btn m-2" onClick={()=>redirectHandler("CREDIT_MANAGER")}>CREDIT</button></> }
         {chatInfo && chatInfo.chatStatus == "PENDING_ON_FIRST_LINE" &&<button className="btn" onClick={resHandler}>Reserve</button>}
        </div>
        )
    }
    else return <span>unauthorized</span>
    
  }
  /**GUARANTEES_MANAGER,
    EXPENSE_MANAGER,
    FACTORING_MANAGER,
    GUARANTEES_MANAGER */