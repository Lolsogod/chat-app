
import Messages from "./Messages"
import Input from "./Input"

export default function Chat({user, sendMsg, selected, messages, setMessages, setUserList}: any) {  

  return (
    <div className="flex flex-col chat-c bg-slate-950 p-2 justify-end items-center ">
        <Messages 
          user={user}
          messages={messages}
          setMessages={setMessages}
          selected={selected}
          />
        <Input
          setUserList={setUserList}
          sendMsg={sendMsg}
          selected={selected}
          user={user}
          setMessages={setMessages}
        />
    </div>
  )
}