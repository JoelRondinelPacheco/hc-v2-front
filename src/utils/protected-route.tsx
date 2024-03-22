import { AuthContextState } from '@/domain/auth';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

const PrivateRoutes = ({role}: {role: string}) => {
    const context: AuthContextState = useOutletContext();
 
    if (!(context.isLoggedIn) || !(context.role).includes(role)) {
        return <Navigate to="/login" replace />
    }

    return (
          <Outlet context={context}/>
      );
    
    }

export default PrivateRoutes