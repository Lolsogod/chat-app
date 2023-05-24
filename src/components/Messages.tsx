import { useEffect } from "react";
import Message from "./Message";

export default function Messages({messages, user}:any) {
  useEffect(()=>{
    console.log(messages)
  }, [messages])
  return (
    <div className="flex flex-col items-end w-1/2 overflow-y-scroll ">
      {messages.map((message: any, i: number) => (
          <Message key={i} message={message} user={user}/>
        ))}
    </div>
  )
}