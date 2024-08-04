import axios from 'axios';

export async function GetData<T>(url: string, token: string | null | undefined): Promise<T> {
    try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const response = await axios.get(`https://setara-api-service-production.up.railway.app/api/v1${url}`, {
            headers: headers,
        });

        return response.data.data ?? [];
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error so it can be handled by the caller
    }
}
