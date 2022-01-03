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
