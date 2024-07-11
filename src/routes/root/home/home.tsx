import { Navigate, Outlet } from "react-router-dom";
import AsideNav from "./components/aside-nav";
import { useGlobalContext } from "@/context/global-context";
import HomeLanding from "./components/home-landing";

export default function Home() {
  const { state } = useGlobalContext();

  return (
    <div className="h-full">
      {state.isLoggedIn ? (
        <div className="flex gap-8">
          <AsideNav />
          <div className="grow">
            {
              state.apiClientReady 
                ? <Outlet context={state} />
                : <h2>Cargando...</h2>
            }
            
          </div>
        </div>
      ) : (
          <HomeLanding />
      )}
    </div>
  );
}
