import type { SafeRpcConfiguration } from './opss-type';

// noinspection JSUnusedGlobalSymbols
export async function config(): Promise<SafeRpcConfiguration> {
  return {
    dependencyPaths: {
      'opss-api': 'src/openapi/',
    },
    dependencyServices: {
      serviceNames: ['opss-api'],
      merge: true,
      exportPath: './src/openapi/openapi.yaml',
    },
    serviceGroups: [],
  };
}
