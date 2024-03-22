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
      return <Categories />
      case "OWNER":
      return <ReportsOwner />
    case "EMPLOYEE":
      return <NewSale />  
    default:
      return <Navigate to="/login" replace />  
  }

}

export default IndexDashboard;