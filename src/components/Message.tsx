export default function Message({message, user}: any) {
    return (
      <div className={`bg-slate-800 p-3 mb-3 rounded-md ${message.from != user &&"self-start"}`}>
         {message.message}
      </div>
    )
  }