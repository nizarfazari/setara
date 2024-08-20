import axios from 'axios';

export async function GetData<T>(
  url: string,
  token: string | null | undefined,
  isFileDownload: boolean = false // Parameter untuk menentukan apakah mengunduh file
): Promise<T | Blob> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const response = await axios.get(`${process.env.VITE_API_URL}${url}`, {
      headers: headers,
      responseType: isFileDownload ? 'blob' : 'json', // Jika file, ubah responseType menjadi 'blob'
    });

    return isFileDownload ? response.data : response.data.data ?? [];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function postData<TRequest, TResponse>(
  url: string,
  data: TRequest,
  token: string | null | undefined
): Promise<TResponse> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.post(
      `${process.env.VITE_API_URL}${url}`,
      data,
      {
        headers: headers,
      }
    );

    return response.data ?? {};
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function putData<TRequest, TResponse>(
  url: string,
  data: TRequest,
  token: string | null | undefined
): Promise<TResponse> {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response = await axios.put(
      `${process.env.VITE_API_URL}${url}`,
      data,
      {
        headers: headers,
      }
    );

    return response.data ?? {};
  } catch (error) {
    console.log(error);
    throw error;
  }
}
