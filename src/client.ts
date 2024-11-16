import API from './api';
import { getLastPowerData, getOneDateEnergyBySn, getOneDayPowerBySn, getSumDataForCustomer } from './api/energy';
import { bindSn, getESSList, getVerificationCode, unbindSn } from './api/general';
import { getChargeConfigInfo, getDisChargeConfigInfo, updateChargeConfigInfo, updateDischargeConfigInfo } from './api/battery';
import { getEvChargerConfigList, getEvChargerCurrentsBySn, getEvChargerStatusBySn, remoteControlEvCharger, setEvChargerCurrentsBySn } from './api/ev-charger';
import { ChargeConfig, DischargeConfig, AlphaESSConfig, GetESSListResponse, EnergySummaryResponse, LastPowerResponse, OneDayPowerResponse, OneDayEnergyResponse, ChargeConfigResponse, DischargeConfigResponse, EVChargerCurrentResponse, EVChargerListResponse, EVChargerSetCurrentResponse, EVChargerStatusResponse, EVChargerRemoteControlResponse } from 'src/types';
export default class AlphaESSClient {
  private readonly api: API;
  
  constructor(config: AlphaESSConfig) {
    this.api = new API(config);
  }

  // General endpoints
  getESSList = (): Promise<GetESSListResponse> => getESSList(this.api);
  getVerificationCode = (sysSn: string, checkCode: string): Promise<void> => getVerificationCode(this.api, sysSn, checkCode);
  bindSn = (sysSn: string, code: string): Promise<void> => bindSn(this.api, sysSn, code);
  unbindSn = (sysSn: string): Promise<void> => unbindSn(this.api, sysSn);

  // Energy/Power endpoints
  getSumDataForCustomer = (sysSn: string): Promise<EnergySummaryResponse> => getSumDataForCustomer(this.api, sysSn);
  getLastPowerData = (sysSn: string): Promise<LastPowerResponse> => getLastPowerData(this.api, sysSn);
  getOneDayPowerBySn = (sysSn: string, queryDate: string): Promise<OneDayPowerResponse> => getOneDayPowerBySn(this.api, sysSn, queryDate);
  getOneDateEnergyBySn = (sysSn: string, queryDate: string): Promise<OneDayEnergyResponse> => getOneDateEnergyBySn(this.api, sysSn, queryDate);
  
  // Battery endpoints
  getChargeConfigInfo = (sysSn: string): Promise<ChargeConfigResponse> => getChargeConfigInfo(this.api, sysSn);
  getDisChargeConfigInfo = (sysSn: string): Promise<DischargeConfigResponse> => getDisChargeConfigInfo(this.api, sysSn);
  updateChargeConfigInfo = (sysSn: string, settings: ChargeConfig): Promise<ChargeConfigResponse> => updateChargeConfigInfo(this.api, sysSn, settings);
  updateDisChargeConfigInfo = (sysSn: string, settings: DischargeConfig): Promise<DischargeConfigResponse> => updateDischargeConfigInfo(this.api, sysSn, settings);

  // EV Charger endpoints
  getEvChargerConfigList = (sysSn: string): Promise<EVChargerListResponse> => getEvChargerConfigList(this.api, sysSn);
  getEvChargerCurrentsBySn = (sysSn: string): Promise<EVChargerCurrentResponse> => getEvChargerCurrentsBySn(this.api, sysSn);
  setEvChargerCurrentsBySn = (sysSn: string, currentsetting: number): Promise<EVChargerSetCurrentResponse> => setEvChargerCurrentsBySn(this.api, sysSn, currentsetting);
  getEvChargerStatusBySn = (sysSn: string, evchargerSn: string): Promise<EVChargerStatusResponse> => getEvChargerStatusBySn(this.api, sysSn, evchargerSn);
  remoteControlEvCharger = (sysSn: string, evchargerSn: string, controlMode: string): Promise<EVChargerRemoteControlResponse> => remoteControlEvCharger(this.api, sysSn, evchargerSn, controlMode);
}
