import { APIRequestContext, APIResponse, request } from '@playwright/test';

export abstract class BaseClient {
  protected context!: APIRequestContext;

  constructor(protected baseURL: string) {}

  async init() {
    this.context = await request.newContext({
      baseURL: this.baseURL,
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  }

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
