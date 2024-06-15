import { useAuthContext } from '@/context/auth-context'
import Categories from '../categories/categories';
import NewSale from '../new-sale/new-sale';
import ReportsOwner from '../reports/reports';
import { Navigate, useOutletContext } from 'react-router-dom';
import { AuthContextState } from '@/domain/auth';

const IndexDashboard = () => {

  const context: AuthContextState = useOutletContext();

  switch (context.role) {
    case "ADMIN":
      return <Navigate to ="/category" replace/>
    case "ADMIN-DEMO":
      return <Navigate to ="/category" replace/>
    case "OWNER":
      return <ReportsOwner />
    case "OWNER-DEMO":
      return <ReportsOwner />
    case "EMPLOYEE":
      return <Navigate to ="/new-sale" replace/>
    case "EMPLOYEE-DEMO":
      return <Navigate to ="/new-sale" replace/>
    default:
      return <Navigate to="/login" replace />  
  }

}

export default IndexDashboard;