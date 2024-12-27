export type AlphaESSConfig = {
  appID: string;
  appSecret: string;
  timeout?: number;
}

export type AlphaESSResponse<T> = {
  info?: string;
  msg?: string;
  data: T;
}
export type ChargeConfig = {
  batHighCap: number; // Charging Stops at SOC [%]
  gridCharge: number; // Enable Grid Charging Battery
  timeChae1: string; // Charging Period 1 end time
  timeChae2: string; // Charging Period 2 end time
  timeChaf1: string; // Charging Period 1 start time
  timeChaf2: string; // Charging Period 2 start time
};

export type ChargeConfigResponse = ChargeConfig;

export type DischargeConfig = {
  batUseCap: number; // Discharging Cutoff SOC [%]
  ctrDis: number; // Enable Battery Discharge Time Control
  timeDise1: string; // Discharging Period 1 End time
  timeDise2: string; // Discharging Period 2 End time
  timeDisf1: string; // Discharging Period 1 Start time
  timeDisf2: string; // Discharging Period 2 Start time
};

export type DischargeConfigResponse = DischargeConfig;

export type EnergySummaryResponse = {
  epvtoday: number; // Today's Generation, unit: kWh
  epvtotal: number; // Total Generation, unit: kWh
  eload: number; // Today's Load, unit: kWh
  eoutput: number; // Today's Feed-in, unit: kWh
  einput: number; // Today's Consumed, unit: kWh
  echarge: number; // Today's Charged, unit: kWh
  edischarge: number; // Today's Discharged, unit: kWh
  todayIncome: number; // Today's Income
  totalIncome: number; // Total Profit
  eselfConsumption: number; // Self-consumption, unit: %
  eselfSufficiency: number; // Self-sufficiency, unit: %
  treeNum: number; // Trees Planted
  carbonNum: number; // CO2 Reduction, unit: kg
  moneyType: string; // Currencies
};

export type LastPowerResponse = {
  ppv: number; // Pv total power, unit: W
  ppvDetail: {
    ppv1: number;
    ppv2: number;
    ppv3: number;
    ppv4: number;
    pmeterDc: number;
  };
  pload: number; // Load, unit: W
  soc: number; // State of Charge
  pgrid: number; // When pgrid is positive, it means taking electricity from the mains; when pgrid is negative, it means selling electricity. Unit:W
  pgridDetail: {
    pmeterL1: number;
    pmeterL2: number;
    pmeterL3: number;
  };
  pbat: number; // Battery power, unit: W
  prealL1: number;
  prealL2: number;
  prealL3: number;
  pev: number; // Total power of charging pile, unit: W
  pevDetail: {
    ev1Power: number;
    ev2Power: number;
    ev3Power: number;
    ev4Power: number;
  };
};

export type OneDayPowerResponse = {
  cobat: number; // Battery capacity
  feedIn: number; // Feed-in
  gridCharge: number; // Grid purchase real-time power
  load: number; // Load
  pChargingPile: number; // Charging pile power
  ppv: number; // PV power
  sysSn: string; // System S/N
  uploadTime: string; // upload Time
};

export type OneDayEnergyResponse = {
  eCharge: number; // total energy charged from battery，unit：kWh
  eChargingPile: number; // Total energy consumed by charging piles，unit：kWh
  eDischarge: number; // Discharge，unit：kWh
  eGridCharge: number; // Grid-charge，unit：kWh
  eInput: number; // Grid consumption，unit：kWh
  eOutput: number; // Feed-in，unit：kWh
  epv: number; // PV generation，unit：kWh
  sysSn: string; // System S/N
  theDate: string; // Date
};

import { EVChargerControlMode, EVChargerStatus } from "./enums";

export type EVChargerListResponse = {
  evchargerSn: string;
  evchargerModel: string;
}[];

export type EVChargerCurrentResponse = {
  currentsetting: number;
};

export type EVChargerSetCurrentResponse = {
  currentsetting: number;
};

export type EVChargerStatusResponse = {
  evchargerStatus: EVChargerStatus;
}[];

export type EVChargerRemoteControlResponse = {
  controlMode:	EVChargerControlMode;
};

export type GetESSListResponse = {
  cobat: number; // battery capacity
  emsStatus: string; // EMS status
  mbat: string; // battery model
  minv: string; // Inverter model
  poinv: number; // Inverter nominal Power
  popv: number; // Pv nominal Power
  surplusCobat: number; // decimal	Battery capacity remaining
  sysSn: string; // System S/N
  usCapacity: number; // decimal	Battery Available Percentage
}[];
