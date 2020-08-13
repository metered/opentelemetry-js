/// <reference lib="dom" />
/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  DEFAULT_ENVIRONMENT,
  ENVIRONMENT,
  ENVIRONMENT_MAP,
  parseEnvironment,
} from '@opentelemetry/core/platform/common';

/**
 * Gets the environment variables
 */
export function getEnv(): Required<ENVIRONMENT> {
  const _window = window as typeof window & ENVIRONMENT_MAP;
  const globalEnv = parseEnvironment(_window);
  return Object.assign({}, DEFAULT_ENVIRONMENT, globalEnv);
}
