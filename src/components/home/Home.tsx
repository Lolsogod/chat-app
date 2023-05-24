import { useEffect, useState } from "react";
import Chat from "../Chat";
import SideBar from "../Sidebar";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function Home(){
    const URL = 'http://127.0.0.1:9080/chat';
    const [selected, setSelected] = useState('')
    const [client, setClient] = useState<Stomp.Client | null>()
    const [user, setUser] = useState('0');
    const [messages, setMessages] = useState<any>([])

    const connectWS = async ()=> {
        const ws = new SockJS(`${URL}`);
      
        await setClient(Stomp.over(ws))
        console.log(client)
      }
    
      function sendMsg(from: any, text: any) {
        client!.send("/app/chat" , {}, JSON.stringify({
            text: text,
            chatId: selected, 
            senderId: from,
        }));
      }

    useEffect(()=>{
        console.log(selected)
    }, [selected])
    useEffect(()=>{
        if (client){
          client!.connect({}, () => {
          client!.subscribe("/topic/messages/" + user, (mes: any) => {
            setMessages((messages: any) => [...messages, JSON.parse(mes.body)])
          });
        });
      }    
    },[client])
    return(
        <div className="flex home-c">
            <SideBar
                    setSelected={setSelected}
                    selected={selected}
                    user={user}
                    connectWS={connectWS}
                    client={client}
                    setUser={setUser}/>
            <Chat 
                sendMsg={sendMsg}
                selected={selected}
                user={user}
                messages={messages}
                setMessages={setMessages}
            />
        </div>
    )
}