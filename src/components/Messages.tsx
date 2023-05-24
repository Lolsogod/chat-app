import Message from "./Message";

export default function Messages() {
  return (
    <div className="flex flex-col items-end w-1/2 overflow-y-scroll ">
       <Message/>
       <Message/>
       <Message/>
       <Message/>
    </div>
  )
}