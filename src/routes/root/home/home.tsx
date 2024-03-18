import LoginCard from "@/components/login-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth-context";
import AsideNav from "./components/aside-nav";
import Dashboard from "./components/dashboard";
import { Outlet, useNavigate } from "react-router-dom";

function Home() {
    const { state } = useAuthContext();
    const navigate = useNavigate()
    if (state.isLoggedIn) {
        navigate("/" + state.role.toLowerCase());
    } else {
        return NoAuthHome();
    }
}

function NoAuthHome () {
    return <LoginCard></LoginCard>
}

export default Home;