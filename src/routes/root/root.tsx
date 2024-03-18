import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
        <Header />
        <main className="container mx-auto">
          <Outlet />
        </main>
        <footer>FOOTER</footer>
    </>
  )
}
