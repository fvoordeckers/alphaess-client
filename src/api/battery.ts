import API from 'src/api';
import { ChargeConfigResponse, DischargeConfigResponse, ChargeConfig, DischargeConfig } from '../types';

export const getChargeConfigInfo = (api: API, sysSn: string) => {
  return api.get<ChargeConfigResponse>('/getSumDataForCustomer', { sysSn });
}

export const updateChargeConfigInfo = (api: API, sysSn: string, settings: ChargeConfig) => {
  return api.post<ChargeConfigResponse>('/updateChargeConfigInfo', { sysSn, ...settings });
}

export const getDisChargeConfigInfo = (api: API, sysSn: string) => {
  return api.get<DischargeConfigResponse>('/getDisChargeConfigInfo', { sysSn });
}

export const updateDischargeConfigInfo = (api: API, sysSn: string, settings: DischargeConfig) => {
  return api.post<DischargeConfigResponse>('/updateChargeConfigInfo', { sysSn, ...settings });
}

