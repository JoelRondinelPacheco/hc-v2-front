import Footer from "@/components/footer";
import Header from "@/components/header";
import { useGlobalContext } from "@/context/global-context";
import { Outlet } from "react-router-dom";

export default function Root() {

  const {state} = useGlobalContext();

//todo poner aca si esta logeado?

  return (
    <div className='flex flex-col h-screen'>
        <Header />
        <main className="container mx-auto grow pt-4">
          <Outlet context={state} />
        </main>
        <Footer />
    </div>
  )
}
