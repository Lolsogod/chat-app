
import { useKeycloak } from "@react-keycloak/web";

export default function Message({message, user}: any) {
  const { keycloak } = useKeycloak()
  const getUsername = () => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }
    return (
      <div className={`chat mt-3 ${message.senderId != getUsername()?"chat-start":"chat-end"} `}>
        <div className={`chat-bubble pl-2`}>
          {message.text}
      </div></div>
    )
  }
  /**className={`bg-slate-800 p-3 mb-3 rounded-md ${message.senderId != getUsername() &&"self-start"}` */