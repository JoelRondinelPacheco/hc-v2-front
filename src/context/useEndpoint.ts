import React, { useContext } from 'react'
import { useNewSaleContext } from './new-sale.context';

const useEndpoint = () => {
    const { endpoint, updateEndpoint } = useNewSaleContext();

    return { endpoint, updateEndpoint };
}

export default useEndpoint