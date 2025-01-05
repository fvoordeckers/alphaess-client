import API from "src/api";
import { EnergySummaryResponse, LastPowerResponse, OneDayPowerResponse, OneDayEnergyResponse } from "../types";

export const getSumDataForCustomer = (api: API, sysSn: string) => {
  return api.get<EnergySummaryResponse>('/getSumDataForCustomer', { sysSn });
}

export const getLastPowerData = (api: API, sysSn: string) => {
  return api.get<LastPowerResponse>('/getLastPowerData', { sysSn });
}

export const getOneDayPowerBySn = (api: API, sysSn: string, queryDate: string) => {
  return api.get<OneDayPowerResponse>('/getOneDayPowerBySn', { sysSn, queryDate });
}

export const getOneDateEnergyBySn = (api: API, sysSn: string, queryDate: string) => {
  return api.get<OneDayEnergyResponse>('/getOneDateEnergyBySn', { sysSn, queryDate });
}

