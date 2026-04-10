import { APIRequestContext, APIResponse, request } from '@playwright/test';

/**
 * Abstract parent for every API client.
 *
 * Owns a Playwright `APIRequestContext` preconfigured with the target
 * `baseURL` and JSON headers, and exposes typed HTTP verbs (`get`, `post`,
 * `put`, `delete`) so subclasses only describe endpoints, not transport
 * details.
 *
 * Lifecycle: call `init()` before the first request and `dispose()` when the
 * client is no longer needed — the API fixture handles both automatically
 * around each test.
 */
export abstract class BaseClient {
  protected context!: APIRequestContext;

  constructor(protected baseURL: string) {}

  /** Creates the underlying request context. Must be called before any HTTP verb. */
  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

  /** Releases the underlying request context. Call it once the client is no longer needed. */
  async dispose() {
    await this.context.dispose();
  }

  protected async get(endpoint: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.context.get(endpoint, options);
  }

  protected async post(endpoint: string, data: unknown, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.context.post(endpoint, { data, ...options });
  }

  protected async put(endpoint: string, data: unknown, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.context.put(endpoint, { data, ...options });
  }

  protected async delete(endpoint: string, options?: { headers?: Record<string, string> }): Promise<APIResponse> {
    return this.context.delete(endpoint, options);
  }
}
