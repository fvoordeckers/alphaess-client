import API from "src/api";
import { EVChargerCurrentResponse, EVChargerListResponse, EVChargerStatusResponse, EVChargerSetCurrentResponse, EVChargerRemoteControlResponse} from "../types";

export const getEvChargerConfigList = (api: API, sysSn: string) => {
  return api.get<EVChargerListResponse>('/getEvChargerConfigList', { sysSn });
};
export const getEvChargerCurrentsBySn = (api: API, sysSn: string) => {
  return api.get<EVChargerCurrentResponse>('/getEvChargerCurrentsBySn', { sysSn });
};
export const setEvChargerCurrentsBySn = (api: API, sysSn: string, currentsetting: number) => {
  return api.post<EVChargerSetCurrentResponse>('/setEvChargerCurrentsBySn', { sysSn, currentsetting });
};
export const getEvChargerStatusBySn = (api: API, sysSn: string, evchargerSn: string) => {
  return api.get<EVChargerStatusResponse>('/getEvChargerStatusBySn', { sysSn, evchargerSn });
};
export const remoteControlEvCharger = (api: API, sysSn: string, evchargerSn: string, controlMode: string) => {
  return api.post<EVChargerRemoteControlResponse>('/remoteControlEvCharger', { sysSn, evchargerSn, controlMode });
};
