import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const useCheckAuth = (isAuth: boolean) => {
    const navigation = useNavigate()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuth) navigation("/")
        setLoading(false)
    }, [])
    
    return loading;
}

export default useCheckAuth;