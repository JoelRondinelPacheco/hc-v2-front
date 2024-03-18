import LoginCard from "@/components/login-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth-context";
import AsideNav from "./components/aside-nav";
import Dashboard from "./components/dashboard";

function Home() {
    const { state } = useAuthContext();

    if (state.isLoggedIn) {
        return AuthHome();
    } else {
        return NoAuthHome();
    }
}

function AuthHome() {
    return (
    <div className="flex gap-8">

    <AsideNav />
    <Dashboard />
    </div>
    )
}

function NoAuthHome () {
    return <LoginCard></LoginCard>
}

export default Home;