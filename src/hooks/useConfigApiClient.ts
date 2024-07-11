import { refreshAccessToken, setAccessToken } from '@/lib/common/adapter/out/http/api-client'
import React, { useEffect, useState } from 'react'

const useConfigApiClient = () => {
    const [apiClientReady, setApiClientReady] = useState<boolean>(false)
    const setAuthToken = async () => {
        try {
            const token = await refreshAccessToken();
            setAccessToken(token)
            setApiClientReady(true);
        } catch (e) {
            setApiClientReady(false)
        }
    }

    useEffect(() => {
        setAuthToken();
    }, [])


  return { apiClientReady }
}

export default useConfigApiClient