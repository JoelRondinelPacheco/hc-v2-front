import { useGlobalContext } from '@/context/global-context'
import Categories from '../categories/categories';
import NewSale from '../new-sale/new-sale';
import ReportsOwner from '../reports/reports';
import { Navigate, useOutletContext } from 'react-router-dom';
import { GlobalContextState } from '@/domain/auth';

const IndexDashboard = () => {

  const context: GlobalContextState = useOutletContext();

  switch (context.role) {
    case "ADMINISTRATOR":
      return <Navigate to ="/hc-v2-front/category" replace/>
    case "ADMINISTRATOR-DEMO":
      return <Navigate to ="/hc-v2-front/category" replace/>
    case "OWNER":
      return <Navigate to ="/hc-v2-front/reports" replace/>
    case "OWNER-DEMO":
      return <Navigate to ="/hc-v2-front/reports" replace/>
    case "EMPLOYEE":
      return <Navigate to ="/hc-v2-front/new-sale" replace/>
    case "EMPLOYEE-DEMO":
      return <Navigate to ="/hc-v2-front/new-sale" replace/>
    default:
      return <Navigate to="/hc-v2-front/login" replace />  
  }

}

export default IndexDashboard;