import { useState } from 'react';
import { AxiosError } from 'axios';
import { postData } from '../utils/GetData';

export function usePostData<TRequest, TResponse>(url: string, token: string | null | undefined) {
    const [data, setData] = useState<TResponse | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<AxiosError | null>(null);
    
    const post = async (data: TRequest) => {
        setIsLoading(true);
        setIsError(null);
        try {
            const result = await postData<TRequest, TResponse>(url, data, token);
            setData(result);
        } catch (error: unknown) {
            setIsError(error as AxiosError);
        }
        setIsLoading(false);
    };

    return { data, isLoading, isError, post };
}
