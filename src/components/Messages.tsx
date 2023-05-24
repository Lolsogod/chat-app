import { useEffect } from "react";
import Message from "./Message";
import { chatApi } from "./api/ChatApi";
import { useKeycloak } from "@react-keycloak/web";

export default function Messages({messages, user, setMessages, selected}:any) {
  const { keycloak } = useKeycloak()
  useEffect( ()=>{
    const fetchData = async () => {
      setMessages([...(await chatApi.messageHistory(keycloak.token, selected)).data]) 
      console.log((await chatApi.messageHistory(keycloak.token, selected)).data)
    }
    fetchData().catch(console.error);
  }, [selected])
  return (
    <div className="flex flex-col items-end w-1/2 overflow-y-scroll ">
      {messages.map((message: any, i: number) => (
          <Message key={i} message={message} user={user}/>
        ))}
    </div>
  )
}