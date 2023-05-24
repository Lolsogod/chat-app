import ChatItem from "./ChatItem";

export default function SideBar() {
  return (
    <div className="flex flex-1 flex-col bg-slate-900 p-2 gap-2 overflow-y-scroll">
      
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
        <ChatItem/>
    </div>
  )
}