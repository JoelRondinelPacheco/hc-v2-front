import { GlobalContextState } from '@/lib/common/domain/entities/auth';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

const PrivateRoutes = ({role}: {role: string}) => {
    const context: GlobalContextState = useOutletContext();

    if (!(context.isLoggedIn) || !(role).includes(context.role)) {
        return <Navigate to="/hc-v2-front/login" replace />
    }

    return (
          <Outlet context={context}/>
      );
    
    }

export default PrivateRoutes