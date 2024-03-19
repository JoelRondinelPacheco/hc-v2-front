import { useAuthContext } from "@/context/auth-context"
import UserInfo from "./user-info";
import { Link } from "react-router-dom";


//Si no esta logeado logo de todo turismo en el centro, si esta logeado renderiza componente user info
function Header() {
  const {state} = useAuthContext();
  return (
    <header>
      <div>
        <Link to="/">TodoTurismo asdas</Link>
        <Link to="/products">ADMIN ROUTE</Link>
        <Link to="/my-sales">EMPLOYEE ROUTE</Link>
        <Link to="/admins">OWNER ROYE</Link>
        <h2>{state.isLoggedIn ? "true" : "false"}</h2>
      </div>

      {state.isLoggedIn && <UserInfo></UserInfo>}


    </header>    
  )
}

export default Header