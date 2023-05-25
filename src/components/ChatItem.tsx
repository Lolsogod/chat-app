
export default function ChatItem({id, setSelected, selected, status}:any) {
  return (
    <div onClick={() => setSelected(id)} className={`p-5 roundCool ${id==selected ? "coolSelect" : "coolHover"} cursor-pointer`}>
        {`Обращение - ${id.slice(-7)}`} {status}
    </div>
  )
}