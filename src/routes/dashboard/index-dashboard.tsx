import { useAuthContext } from '@/context/auth-context'
import Categories from '../categories/categories';
import NewSale from '../new-sale/new-sale';
import ReportsOwner from '../reports/reports';
import { Navigate, useOutletContext } from 'react-router-dom';
import { AuthContextState } from '@/models/auth';

const IndexDashboard = () => {

  const context: AuthContextState = useOutletContext();

  console.log("entro a index")
  console.log(context.role)
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

  return <h2>INDEX DASH</h2>

}

export default IndexDashboard