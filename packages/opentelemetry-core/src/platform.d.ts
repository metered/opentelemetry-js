/// <reference lib="dom" />

declare module '@opentelemetry/core/platform' {
  export function unrefTimer(timer: ReturnType<typeof setTimeout>): void;

  export const SDK_INFO: {
    NAME: string
    RUNTIME: string
    LANGUAGE: string
    VERSION: string
  };

  export function randomTraceId(): string

  export function randomSpanId(): string

  export function hexToBase64(hexStr: string): string

  import {
    ENVIRONMENT,
  } from '@opentelemetry/core/platform/common';

  export function getEnv(): Required<ENVIRONMENT>

  import { BaseAbstractPlugin } from '@opentelemetry/core/platform/common';
  import {
    Plugin,
    Logger,
    PluginConfig,
    TracerProvider,
  } from '@opentelemetry/api';
  export abstract class BasePlugin<T> extends BaseAbstractPlugin<T>

  implements Plugin<T> {
    enable(
      moduleExports: T,
      tracerProvider: TracerProvider,
      logger: Logger,
      config?: PluginConfig
    ): T;

    disable(): void;
  }

  export const otperformance: {
    timeOrigin: number | DOMHighResTimeStamp
    now(): number | DOMHighResTimeStamp
    getEntriesByType(type: string): PerformanceResourceTiming[]
  }
}
