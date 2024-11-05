export interface EnvironmentGroup {
  id: string;
  name: string;
  description: string;
  updatedAt: string;
  variables: EnvironmentVariable[];
}

export interface EnvironmentVariable {
  id: string;
  name: string;
  value: string;
  type: 'Secret' | 'Public';
}

// 生成测试数据的辅助函数
function generateEnvironmentGroup(index: number): EnvironmentGroup {
  const environments = [
    'Development',
    'Production',
    'Staging',
    'Testing',
    'QA',
    'UAT',
    'Demo',
    'Sandbox',
    'Integration',
    'Performance',
  ];
  const purposes = [
    '本地开发环境',
    '生产环境',
    '预发布环境',
    '测试环境',
    '质量保证环境',
    '用户验收测试',
    '演示环境',
    '沙箱环境',
    '集成测试',
    '性能测试',
  ];

  const envIndex = index % environments.length;
  const suffix =
    index >= environments.length ? ` ${Math.floor(index / environments.length) + 1}` : '';

  return {
    id: `env-${index + 1}`,
    name: environments[envIndex] + suffix,
    description: `${purposes[envIndex]}配置，用于${purposes[envIndex]}的所有服务和应用。包含必要的API密钥、数据库连接和第三方服务配置。`,
    updatedAt: new Date(2024, 2, 20 - index).toISOString().split('T')[0],
    variables: [
      {
        id: `var-${index}-1`,
        name: 'API_KEY',
        value: 'sk-xxxxx',
        type: 'Secret',
      },
      {
        id: `var-${index}-2`,
        name: 'DATABASE_URL',
        value: 'postgresql://user:pass@localhost:5432/db',
        type: 'Secret',
      },
      {
        id: `var-${index}-3`,
        name: 'SERVICE_URL',
        value: 'https://api.example.com',
        type: 'Public',
      },
    ],
  };
}

// 生成50个环境组
export const environmentGroups: EnvironmentGroup[] = Array.from({ length: 50 }, (_, index) =>
  generateEnvironmentGroup(index),
);
