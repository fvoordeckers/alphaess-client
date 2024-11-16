import axios, { AxiosInstance } from 'axios';
import * as crypto from 'crypto';
import { BASE_URL, DEFAULT_TIMEOUT } from '../constants';
import { AlphaESSConfig, AlphaESSResponse } from '../types';

export default class API {
  private readonly appID: string;
  private readonly appSecret: string;
  private readonly client: AxiosInstance;
  
  constructor(config: AlphaESSConfig) {
    this.appID = config.appID;
    this.appSecret = config.appSecret;
    this.client = axios.create({
      baseURL: BASE_URL,
      timeout: config.timeout || DEFAULT_TIMEOUT,
    });
  }
  
  private getHeaders(): Record<string, string> {
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const sign = crypto
      .createHash('sha512')
      .update(`${this.appID}${this.appSecret}${timestamp}`)
      .digest('hex');
    
    return {
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Cache-Control': 'no-cache',
      'timestamp': timestamp,
      'sign': sign,
      'appId': this.appID,
      'timeStamp': timestamp
    };
  }

  private handleResponse = <T>(response: AlphaESSResponse<T>): T => {
    if (response.msg !== 'Success') {
      console.error(`Unexpected response: ${response.msg}`);
      throw Error(response.msg);
    }
    
    return response.data;
  }

  async get<T>(path: string, params: Record<string, any> = {}): Promise<T> {
    try {
      const response = await this.client.get<AlphaESSResponse<T>>(path, {
        headers: this.getHeaders(),
        params
      });
      
      return this.handleResponse<T>(response.data);
    } catch (error) {
      console.error(`Error in apiGet: ${error}`);
      throw error;
    }
  }
  
  async post<T>(path: string, data: Record<string, any>): Promise<T> {
    try {
      const response = await this.client.post<AlphaESSResponse<T>>(path, data, {
        headers: this.getHeaders()
      });
      
      return this.handleResponse<T>(response.data);
    } catch (error) {
      console.error(`Error in apiPost: ${error}`);
      throw error;
    }
  }
}
