import { apiClient } from '@/lib/axios';

export interface HealthCheckResponse {
  status: string;
}

export const checkHealth = async (): Promise<HealthCheckResponse> => {
  const response = await apiClient.get<HealthCheckResponse>('/health');
  return response.data;
};
