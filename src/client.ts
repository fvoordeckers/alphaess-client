import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';
import { AlphaESSConfig, AlphaESSResponse, ChargeSettings, DischargeSettings, SystemData } from './types';
import { BASE_URL, DEFAULT_TIMEOUT } from './constants';

export default class AlphaESSClient {
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
  
  private async apiGet<T>(path: string, params: Record<string, any> = {}): Promise<T | null> {
    try {
      const response = await this.client.get<AlphaESSResponse<T>>(path, {
        headers: this.getHeaders(),
        params
      });
      
      if (response.data.msg !== 'Success') {
        console.error(`Unexpected response: ${response.data.msg}`);
        return null;
      }
      
      return response.data.data;
    } catch (error) {
      console.error(`Error in apiGet: ${error}`);
      throw error;
    }
  }
  
  private async apiPost<T>(path: string, data: Record<string, any>): Promise<T | null> {
    try {
      const response = await this.client.post<AlphaESSResponse<T>>(path, data, {
        headers: this.getHeaders()
      });
      
      if (response.data.msg !== 'Success') {
        console.error(`Unexpected response: ${response.data.msg}`);
        return null;
      }
      
      return response.data.data;
    } catch (error) {
      console.error(`Error in apiPost: ${error}`);
      throw error;
    }
  }
  
  async getESSList(): Promise<SystemData[]> {
    return this.apiGet<SystemData[]>('/getEssList') || [];
  }
  
  async getLastPowerData(sysSn: string): Promise<any> {
    return this.apiGet('/getLastPowerData', { sysSn });
  }
  
  async getOneDayPowerBySn(sysSn: string, queryDate: string): Promise<any> {
    const localDate = new Date().toISOString().split('T')[0];
    const finalDate = queryDate === localDate ? queryDate : localDate;
    
    return this.apiGet('/getOneDayPowerBySn', { sysSn, queryDate: finalDate });
  }
  
  async getSumDataForCustomer(sysSn: string): Promise<any> {
    return this.apiGet('/getSumDataForCustomer', { sysSn });
  }
  
  async getOneDateEnergyBySn(sysSn: string, queryDate: string): Promise<any> {
    const localDate = new Date().toISOString().split('T')[0];
    const finalDate = queryDate === localDate ? queryDate : localDate;
    
    return this.apiGet('/getOneDateEnergyBySn', { sysSn, queryDate: finalDate });
  }
  
  async getChargeConfigInfo(sysSn: string): Promise<any> {
    return this.apiGet('/getChargeConfigInfo', { sysSn });
  }
  
  async getDisChargeConfigInfo(sysSn: string): Promise<any> {
    return this.apiGet('/getDisChargeConfigInfo', { sysSn });
  }
  
  async updateChargeConfigInfo(settings: ChargeSettings): Promise<any> {
    return this.apiPost('/updateChargeConfigInfo', settings);
  }
  
  async updateDisChargeConfigInfo(settings: DischargeSettings): Promise<any> {
    return this.apiPost('/updateDisChargeConfigInfo', settings);
  }
  
  async authenticate(): Promise<boolean> {
    try {
      const units = await this.getESSList();
      return units.some(unit => 'sysSn' in unit);
    } catch (error) {
      console.error(`Authentication error: ${error}`);
      throw error;
    }
  }
  
  async getAllData(getPower: boolean = false, delay: number = 0): Promise<SystemData[]> {
    try {
      const allData: SystemData[] = [];
      const units = await this.getESSList();
      
      for (const unit of units) {
        if ('sysSn' in unit) {
          const serial = unit.sysSn;
          
          unit.SumData = await this.getSumDataForCustomer(serial);
          if (delay) await new Promise(resolve => setTimeout(resolve, delay));
          
          unit.OneDateEnergy = await this.getOneDateEnergyBySn(serial, new Date().toISOString().split('T')[0]);
          if (delay) await new Promise(resolve => setTimeout(resolve, delay));
          
          unit.LastPower = await this.getLastPowerData(serial);
          if (delay) await new Promise(resolve => setTimeout(resolve, delay));
          
          unit.ChargeConfig = await this.getChargeConfigInfo(serial);
          if (delay) await new Promise(resolve => setTimeout(resolve, delay));
          
          unit.DisChargeConfig = await this.getDisChargeConfigInfo(serial);
          
          if (getPower) {
            if (delay) await new Promise(resolve => setTimeout(resolve, delay));
            unit.OneDayPower = await this.getOneDayPowerBySn(serial, new Date().toISOString().split('T')[0]);
          }
          
          allData.push(unit);
        }
      }
      
      return allData;
    } catch (error) {
      console.error(`Error in getAllData: ${error}`);
      throw error;
    }
  }
  
  async setBatteryCharge(
    serial: string,
    enabled: boolean,
    cp1start: string,
    cp1end: string,
    cp2start: string,
    cp2end: string,
    chargeStopSoc: number
  ): Promise<void> {
    const settings: ChargeSettings = {
      sysSn: serial,
      gridCharge: enabled ? 1 : 0,
      timeChaf1: cp1start,
      timeChae1: cp1end,
      timeChaf2: cp2start,
      timeChae2: cp2end,
      batHighCap: chargeStopSoc
    };
    
    await this.updateChargeConfigInfo(settings);
  }
  
  async setBatteryDischarge(
    serial: string,
    enabled: boolean,
    dp1start: string,
    dp1end: string,
    dp2start: string,
    dp2end: string,
    dischargeCutoffSoc: number
  ): Promise<void> {
    const settings: DischargeSettings = {
      sysSn: serial,
      ctrDis: enabled ? 1 : 0,
      timeDisf1: dp1start,
      timeDise1: dp1end,
      timeDisf2: dp2start,
      timeDise2: dp2end,
      batUseCap: dischargeCutoffSoc
    };
    
    await this.updateDisChargeConfigInfo(settings);
  }
}
