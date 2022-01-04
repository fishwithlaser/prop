export interface DecimalDegreesParams {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
}

export interface guiEventInterface {
  DecimalDegrees: DecimalDegreesParams;
  userInfo?: {
    uuid: string;
  };
}

export enum saleTypes {
  lease,
  leasehold,
  sale,
  active,
  expired,
}

export interface SaleHistory {
  timestamp: number;
  price: number;
  saleType: saleTypes;
  mlsS3Link: string;
}

export interface PropertyInformation {
  latitude: number;
  lontitude: number;
  postalCode: string;
  address: string;
  city: string;
  province: string;
  propertyHistory: [SaleHistory];
}
