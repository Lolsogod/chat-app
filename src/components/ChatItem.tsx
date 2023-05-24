
export default function ChatItem({id, setSelected, selected, status}:any) {
  return (
    <div onClick={() => setSelected(id)} className={`p-5 rounded-md hover:bg-slate-950 cursor-pointer ${id==selected && "bg-slate-950"}`}>
        {`Обращение - ${id.slice(-7)}`} {status}
    </div>
  )
}