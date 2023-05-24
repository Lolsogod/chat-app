
export default function ChatItem({name, setSelected, selected}:any) {
  return (

    <div onClick={() => setSelected(name)} className={`p-5 rounded-md hover:bg-slate-950 cursor-pointer ${name==selected && "bg-slate-950"}`}>
        {name}
    </div>
  )
}