import { Outlet } from "react-router-dom";
import AsideNav from "../root/home/components/aside-nav";
import { useAuthContext } from "@/context/auth-context";
import useCheckAuth from "@/hooks/useCheckAuth";

export default function Dashboard() {

    const { state } = useAuthContext();


    //todo loader
    const loading = useCheckAuth(state.isLoggedIn)
if(!loading){
    return (
    <div className="flex gap-8">

    <AsideNav />
    <Outlet />
    </div>
    )
}
}

