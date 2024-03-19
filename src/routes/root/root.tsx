import Header from "@/components/header";
import { useAuthContext } from "@/context/auth-context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Root() {

  const {state} = useAuthContext();



  return (
    <>
        <Header />
        <main className="container mx-auto">
          <div>Root</div>
          <Outlet context={state} />
        </main>
        <footer>FOOTER</footer>
    </>
  )
}
