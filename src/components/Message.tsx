
import { useKeycloak } from "@react-keycloak/web";

export default function Message({message, user}: any) {
  const { keycloak } = useKeycloak()
  const getUsername = () => {
    return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
  }
    return (
      <div className={`bg-slate-800 p-3 mb-3 rounded-md ${message.senderId != getUsername() &&"self-start"}`}>
         {message.text}
      </div>
    )
  }