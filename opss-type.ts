import type { OpenAPI } from './opss-schema'

export type Framework = 'nest' | 'hono' | 'itty'

/**
 * 被分析的文件，一般是路由文件，如果是 nestjs 则是控制器文件
 */
export interface AnalyzeEntry {
  /**
   * 项目路由前缀
   */
  routePrefix: string
  /**
   * 文件路径
   */
  filePath: string
}

/**
 * 一个 git 仓库可能同时有多组服务，每个 ServiceGroup 对应一组服务
 */
export interface ServiceGroup {
  /**
   * 服务名称，例如 admin、order，如果有另外一个项目依赖本仓库的其中一组服务，则会将该名称设定为 required
   */
  serviceName: string
  /**
   * 这一组服务中，有哪些入口文件
   */
  entryFiles: (string | AnalyzeEntry)[]
  /**
   * 这一组服务，有哪些要用于共享的代码，例如我们可能有一些验证规则与前端通用
   */
  sharePaths?: Record<string, string>
  /**
   * 🥶 暂时未启用
   */
  tsconfigPath?: string
  /**
   * 这组服务，所使用的是哪个框架
   *
   * nestjs 属于实验性支持，关于 koa、express 等，包括 nestjs 的完整支持将于 2024年9月9号 前完成
   */
  framework: Framework
  /**
   * 装饰器别名
   */
  decoratorAlias?: string[]
}

/**
 * 完整的配置类型
 */
export interface SafeRpcConfiguration {
  /**
   * 当解析完成后，使用的回调，可以让用户自定义生成的内容
   */
  onParseComplete?: (openAPI: OpenAPI) => void
  /**
   * 分析入口，一个仓库中的多组服务，一般项目中只有一组服务
   */
  serviceGroups: ServiceGroup[]
  /**
   * tsconfig 指定在分析代码时以哪个 tsconfig 为准，默认为根目录下的 tsconfig.json
   */
  tsconfigPath?: string
  /**
   * 依赖的服务
   */
  dependencyServices?: {
    /**
     * 对应要依赖的服务的名称
     */
    serviceNames: string[]
    /**
     * 导出到哪个位置
     */
    exportPath: string
    /**
     * 是否合并导出的 openapi.yaml
     */
    merge?: boolean
  }
  /**
   * 设置依赖，是将某组服务相关的调用代码生成到指定位置
   *
   * key 为服务名称，value 为文件路径
   */
  dependencyPaths?: Record<string, string>
  /**
   * 设置将 openapi.yaml 生成到哪个位置
   */
  openapiPath?: string
}
