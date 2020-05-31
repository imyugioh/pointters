import { ClientConfig } from './client-config';

export interface NgGapiClientConfig extends ClientConfig {
  discoveryDocs: string[];
}
