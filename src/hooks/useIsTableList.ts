import { useLocation } from "react-router-dom"
type isTableListProps = {
    newForm: string,
    editForm: string,
}
const useIsTableList = (props: isTableListProps) => {
  const route = useLocation()
  const isList = !route.pathname.includes(props.newForm) && !route.pathname.includes(props.editForm)
  
  return { isList }
}

export default useIsTableList