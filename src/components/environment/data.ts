export interface EnvironmentGroup {
  id: string;
  name: string;
  description: string;
  type: 'env' | 'json' | 'yaml';
  updatedAt: string;
  variables: Array<{
    key: string;
    value: string;
  }>;
}

export const environmentGroups: EnvironmentGroup[] = [
  {
    id: '1',
    name: 'production',
    type: 'env',
    description: '生产环境配置',
    updatedAt: '2024-03-20',
    variables: [
      { key: 'API_URL', value: 'https://api.prod.com' },
      { key: 'DEBUG', value: 'false' },
    ],
  },
  {
    id: '2',
    name: 'development',
    type: 'json',
    description: '开发环境配置',
    updatedAt: '2024-03-19',
    variables: [
      { key: 'API_URL', value: 'https://api.dev.com' },
      { key: 'DEBUG', value: 'true' },
    ],
  },
  {
    id: '3',
    name: 'staging',
    type: 'yaml',
    description: '测试环境配置',
    updatedAt: '2024-03-18',
    variables: [
      { key: 'API_URL', value: 'https://api.staging.com' },
      { key: 'DEBUG', value: 'true' },
    ],
  },
];
