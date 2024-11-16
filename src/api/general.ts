import API from "src/api";
import { GetESSListResponse } from "../types";

export const getESSList = (api: API) => {
  return api.get<GetESSListResponse>('/getEssList');
}

export const getVerificationCode = (api: API, sysSn: string, checkCode: string) => {
  return api.post<void>('/getVerificationCode', { sysSn, checkCode });
}

export const bindSn = (api: API, sysSn: string, code: string) => {
  return api.post<void>('/bindSn', { sysSn, code });
}

export const unbindSn = (api: API, sysSn: string) => {
  return api.post<void>('/unbindSn', { sysSn });
}