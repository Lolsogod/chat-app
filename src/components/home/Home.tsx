import Chat from "../Chat";
import SideBar from "../Sidebar";

export default function Home(){
    return(
        <div className="flex home-c">
            <SideBar/>
            <Chat/>
        </div>
    )
}