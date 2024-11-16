import API from "src/api";
import { EnergySummaryResponse, LastPowerResponse, OneDayPowerResponse, OneDayEnergyResponse } from "../types";

export const getSumDataForCustomer = (api: API, sysSn: string) => {
  return api.get<EnergySummaryResponse>('/getSumDataForCustomer', { sysSn });
}

export const getLastPowerData = (api: API, sysSn: string) => {
  return api.get<LastPowerResponse>('/getLastPowerData', { sysSn });
}

export const getOneDayPowerBySn = (api: API, sysSn: string, queryDate: string) => {
  const localDate = new Date().toISOString().split('T')[0];
  const requestDate = queryDate === localDate ? queryDate : localDate;
  
  return api.get<OneDayPowerResponse>('/getOneDayPowerBySn', { sysSn, queryDate: requestDate });
}

export const getOneDateEnergyBySn = (api: API, sysSn: string, queryDate: string) => {
  const localDate = new Date().toISOString().split('T')[0];
  const requestDate = queryDate === localDate ? queryDate : localDate;
  
  return api.get<OneDayEnergyResponse>('/getOneDateEnergyBySn', { sysSn, queryDate: requestDate });
}

