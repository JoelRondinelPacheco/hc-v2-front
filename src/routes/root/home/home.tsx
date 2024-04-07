import { Navigate, Outlet } from "react-router-dom";
import AsideNav from "./components/aside-nav";
import { useAuthContext } from "@/context/auth-context";
import HomeLanding from "./components/home-landing";

export default function Home() {
  const { state } = useAuthContext();

  return (
    <div className="h-full">
      {state.isLoggedIn ? (
        <div className="flex gap-8">
          <AsideNav />
          <div className="grow">
            <Outlet context={state} />
          </div>
        </div>
      ) : (
          <HomeLanding />
      )}
    </div>
  );
}
