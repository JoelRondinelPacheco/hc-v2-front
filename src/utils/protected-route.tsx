import { AuthContextState } from '@/models/auth';
import AsideNav from '@/routes/root/home/components/aside-nav';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

const PrivateRoutes = ({role}: {role: string}) => {
    const context: AuthContextState = useOutletContext();
    console.log(context.role)
    console.log(role)
    console.log("includes")
    console.log((context.role).includes(role))
    if (!(context.isLoggedIn) || !(context.role).includes(role)) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="flex gap-8">
          <Outlet context={context}/>
        </div>
      );
    
    }

export default PrivateRoutes