import { AuthContextState } from '@/domain/auth';
import AsideNav from '@/routes/root/home/components/aside-nav';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

const PrivateRoutes = ({role}: {role: string}) => {
    const context: AuthContextState = useOutletContext();
 
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