import { AuthContextState } from '@/domain/auth';
import { closestIndexTo } from 'date-fns';
import { Outlet, Navigate, useOutletContext } from 'react-router-dom'

const PrivateRoutes = ({role}: {role: string}) => {
    const context: AuthContextState = useOutletContext();

    console.log("CONTEXT")
    console.log(context)
    console.log(role)
    console.log(context.isLoggedIn)
    console.log((context.role).includes(role))

    console.log(!context.isLoggedIn)
    console.log(!(role).includes(context.role))
    if (!(context.isLoggedIn) || !(role).includes(context.role)) {
        console.log("navego a login")
        return <Navigate to="/login" replace />
    }

    return (
          <Outlet context={context}/>
      );
    
    }

export default PrivateRoutes