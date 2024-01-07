import axios, { AxiosInstance, AxiosRequestHeaders, AxiosResponse } from 'axios';

export const API_URL = 'http://localhost:5223/api/v1'
class HttpService {
  private httpService: AxiosInstance;

  constructor() {

    this.httpService = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async get(url: string, token: string | null = null): Promise<AxiosResponse> {
    const headers: AxiosRequestHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    return this.httpService.get(url, { headers });
  }

  async post(url: string, data: any, token: string | null = null): Promise<AxiosResponse> {
    const headers: AxiosRequestHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    if (data instanceof FormData) {
      headers['Content-Type'] = 'multipart/form-data';
    }

    return this.httpService.post(url, data, { headers });
  }

  async put(url: string, data?: any, token: string | null = null): Promise<AxiosResponse> {
    const headers: AxiosRequestHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    return this.httpService.put(url, data, { headers });
  }

  async delete(url: string, token: string | null = null): Promise<AxiosResponse> {
    const headers: AxiosRequestHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    return this.httpService.delete(url, { headers });
  }




}

export default new HttpService();
