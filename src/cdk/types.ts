export interface StackParams {
  codeOutputDir: string;
  appEnvironmentVariables?: { [varName: string]: string };
  slackDataTableCustomProps?: any;
  environment: string;
  enableProvisionedConcurrency?: boolean;
  cloudwatchAlarmEmail: string;
  provisionedConcurrencyConfig?: ProvisionedConcurrencyConfig;
}

export interface ProvisionedConcurrencyConfigValues {
  defaultCapacity?: number;
  minCapacity?: number;
  maxCapacity?: number;
  utilizationThreshold?: number;
}

export interface ProvisionedConcurrencyConfig {
  eventProcessorFunction?: ProvisionedConcurrencyConfigValues;
  ingressFunction?: ProvisionedConcurrencyConfigValues;
}
