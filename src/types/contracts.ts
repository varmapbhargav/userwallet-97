export interface Profile {
  eid: string;
  iccid: string;
  msisdn: string;
  imei: string;
  deviceModel: string;
  osVersion: string;
  mcc: string;
  mnc: string;
  plmn: string;
  status: number;
  createdAt: bigint;
  exists: boolean;
}

export interface Subscription {
  planId: string;
  startDate: bigint;
  endDate: bigint;
  active: boolean;
}

export interface NetworkConfig {
  apn: string;
  authenticationKey: string;
  encryptionKey: string;
  activated: boolean;
}

export interface ESimNFTMetadata {
  iccid: string;
  qrCodeUri: string;
  networkConfigUri: string;
}