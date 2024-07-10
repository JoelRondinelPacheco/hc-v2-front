import { baseAxios } from '@/lib/common/adapter/out/http/api-client';
import useLogin from './useLogin';

const useRefreshToken = () => {
    const { setAuth } = useLogin();

    const refresh = async () => {
        const response = await baseAxios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;