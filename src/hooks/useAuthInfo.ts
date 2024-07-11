import { useGlobalContext } from '@/context/global-context'
import React, { useState } from 'react'

function useAuthInfo() {
//exponer emtodos auth del contexto
    const [st, setSt] = useState("")
    const { role } = useGlobalContext();
  return { st, role};
}

export default useAuthInfo