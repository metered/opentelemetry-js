import { ContextAPI } from './api/context';
/** Entrypoint for context API */
export const context = ContextAPI.getInstance();

import { TraceAPI } from './api/trace';
/** Entrypoint for trace API */
export const trace = TraceAPI.getInstance();

import { MetricsAPI } from './api/metrics';
/** Entrypoint for metrics API */
export const metrics = MetricsAPI.getInstance();

import { PropagationAPI } from './api/propagation';
/** Entrypoint for propagation API */
export const propagation = PropagationAPI.getInstance();

export default {
  trace,
  metrics,
  context,
  propagation,
};
