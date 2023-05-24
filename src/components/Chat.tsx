
import Messages from "./Messages"
import Input from "./Input"

export default function Chat({user, sendMsg, selected, messages, setMessages}: any) {  

  return (
    <div className="flex flex-col chat-c bg-slate-950 p-2 justify-end items-center">
        <Messages 
          user={user}
          messages={messages}/>
        <Input
          sendMsg={sendMsg}
          selected={selected}
          user={user}
          setMessages={setMessages}
        />
    </div>
  )
}