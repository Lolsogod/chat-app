import { useKeycloak } from "@react-keycloak/web"
import { isAdmin, roleParser } from "./api/Helpers"
import { useEffect } from "react"

export default function Navbar(){
    useEffect(()=>{
      console.log(keycloak.hasRealmRole)
    },[])
    const { keycloak } = useKeycloak()
    const handleLogInOut = () => {
        if (keycloak.authenticated) {
          //props.history.push('/')
          keycloak.logout()
        } else {
          keycloak.login()
        }
      }
    
      const checkAuthenticated = () => {
        if (!keycloak.authenticated) {
          handleLogInOut()
        }
      }
    
      const getUsername = () => {
        return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
      }
    
      const getLogInOutText = () => {
        return keycloak.authenticated ? "Logout" : "Login"
      }
    
      const getAdminMenuStyle = () => {
        return keycloak.authenticated && isAdmin(keycloak) ? { "display": "block" } : { "display": "none" }
      }
    useEffect(()=>{
      if(!keycloak.token)
        handleLogInOut()
    },[])
    return(
      <div className="navbar bg-slate-950 navb">
        <div className="flex-1">
          <button className="btn btn-ghost normal-case text-xl big-btn" onClick={()=>window.location.reload()}>Support Chat</button>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 big-btn ">
            <li><a className="no-active">{getUsername()}</a></li>
            <li><button className="btn big-btn " onClick={handleLogInOut}>{getLogInOutText()}</button></li>
            {/*<li><button className="btn" onClick={() => console.log(roleParser(keycloak).includes("CHAT_MANAGER"))}>get</button></li>*/}
          </ul>
        </div>
      </div>
        
    )
}