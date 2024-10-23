export type AlphaESSConfig = {
  appID: string;
  appSecret: string;
  timeout?: number;
}

export type ChargeSettings = {
  sysSn: string;
  batHighCap: number;
  gridCharge: number;
  timeChae1: string;
  timeChae2: string;
  timeChaf1: string;
  timeChaf2: string;
}

export type DischargeSettings = {
  sysSn: string;
  batUseCap: number;
  ctrDis: number;
  timeDise1: string;
  timeDise2: string;
  timeDisf1: string;
  timeDisf2: string;
}

export type AlphaESSResponse<T> = {
  msg: string;
  data: T;
}

export type SystemData = {
  sysSn: string;
  SumData?: any;
  OneDateEnergy?: any;
  LastPower?: any;
  ChargeConfig?: any;
  DisChargeConfig?: any;
  OneDayPower?: any;
  [key: string]: any;
}
