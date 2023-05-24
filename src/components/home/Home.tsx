import { useEffect, useState } from "react";
import Chat from "../Chat";
import SideBar from "../Sidebar";

export default function Home(){
    const [selected, setSelected] = useState('')

    useEffect(()=>{
        console.log(selected)
    }, [selected])
    return(
        <div className="flex home-c">
            <SideBar
                    setSelected={setSelected}
                    selected={selected}/>
            <Chat/>
        </div>
    )
}