import { useGlobalContext } from "@/lib/common/infraestructure/react/global-context";
import UserInfo from "./user-info";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import DarkModeHandler from "./dark-mode-handler";

//Si no esta logeado logo de todo turismo en el centro, si esta logeado renderiza componente user info
function Header() {
  const { state, dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });

    navigate("/hc-v2-front");
  };
  return (
    <header className="bg-slate-900 ">
      <div className="flex justify-between container py-4 items-center">
        <div className="text-2xl text-gray-100">
          <Link to="/hc-v2-front">TodoTurismo</Link>
        </div>
        <div className="">
          <nav className="flex gap-3 items-center">
            {state.isLoggedIn && (
              <div className="flex gap-3 items-center">
                <Link to="/clients" className="pr-8 text-gray-100">
                  <UserInfo />
                </Link>

                <Button variant="outline" onClick={handleLogout}>Logout</Button>
              </div>
            )}
            <DarkModeHandler />
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
