import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AsideNav from "./components/aside-nav";
import { useAuthContext } from "@/context/auth-context";
import { useEffect, useState } from "react";

export default function Home() {
  const { state } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  /*
  useEffect(() => {
      const nav = () => {
          if (state.isLoggedIn) {
              console.log("naavega a dash")
              return (
                <div className="flex gap-8">
                  <AsideNav />
                  <Outlet context={state}/>
                </div>
              );
          } else {
              navigate(to="/login", {replace: true})
          }
      }

      nav()
  }, [])
  */
 console.log("entro home")
  if (state.isLoggedIn) {
    return (
      <div className="flex gap-8">
        <AsideNav />
        <Outlet context={state} />
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

