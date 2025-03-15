export interface FetchOptions {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number>;
}