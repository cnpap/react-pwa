import type { SafeRpcConfiguration } from './opss-type'

// noinspection JSUnusedGlobalSymbols
export async function config(): Promise<SafeRpcConfiguration> {
  return {
    dependencyPaths: {
      'opss-bues-api': 'src/openapi',
    },
    dependencyServices: {
      serviceNames: ['opss-bues-api', 'opss-edge-api'],
      merge: true,
      exportPath: './src/openapi/openapi.yaml',
    },
    serviceGroups: [],
  }
}
