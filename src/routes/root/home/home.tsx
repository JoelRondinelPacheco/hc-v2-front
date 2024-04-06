import { Navigate, Outlet } from "react-router-dom";
import AsideNav from "./components/aside-nav";
import { useAuthContext } from "@/context/auth-context";

export default function Home() {
  const { state } = useAuthContext();

  if (state.isLoggedIn) {
    return (
      <div className="flex gap-8">
        <AsideNav />
        <div className="grow">
        <Outlet context={state} />
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" replace />;
  }
}

