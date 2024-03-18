import { useAuthContext } from "@/context/auth-context"
import UserInfo from "./user-info";


//Si no esta logeado logo de todo turismo en el centro, si esta logeado renderiza componente user info
function Header() {
  const {state} = useAuthContext();
  return (
    <header>
      <div>
        <h1>TodoTurismo</h1>
      </div>

      {state.isLoggedIn && <UserInfo></UserInfo>}


    </header>    
  )
}

export default Header