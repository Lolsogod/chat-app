
import Messages from "./Messages"
import Input from "./Input"


export default function Chat() {
  

  return (
    <div className="flex flex-col chat-c bg-slate-950 p-2 justify-end items-center">
        <Messages/>
        <Input/>
    </div>
  )
}