type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type ApiResponse<T> = {
  data: T;
  response: Response;
};

export type ApiError = {
  status: number;
  message: string;
  data: unknown | undefined;
};

type ReqOpt = {
  body?: unknown | undefined;
  headers?: HeadersInit | undefined;
};

function parseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export function createHttpClient(url: string) {
  const createHeaders = (custom: HeadersInit | undefined): HeadersInit => ({
    'Content-Type': 'application/json',
    ...custom,
  });

  const handleResponse = async <T>(
    response: Response,
  ): Promise<ApiResponse<T>> => {
    const text = await response.text();
    const data = text ? parseJSON(text) : null;
    if (response.ok) return { data: data as T, response };
    throw {
      status: response.status,
      message: response.statusText,
      data,
    } as ApiError;
  };

  const request = async <T>(
    method: HttpMethod,
    endpoint: string,
    options: ReqOpt = {},
  ): Promise<ApiResponse<T>> => {
    const uri = `${url}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const response = await fetch(uri, {
      cache: 'no-cache',
      method,
      headers: createHeaders(options.headers),
      body: options.body ? JSON.stringify(options.body) : undefined,
      credentials: 'include',
    });
    return handleResponse<T>(response);
  };

  return {
    get: <T>(endpoint: string, body: unknown | undefined) =>
      request<T>('GET', endpoint, { body }),
    post: <T>(endpoint: string, body: unknown | undefined) =>
      request<T>('POST', endpoint, { body }),
    put: <T>(endpoint: string, body: unknown | undefined) =>
      request<T>('PUT', endpoint, { body }),
    patch: <T>(endpoint: string, body: unknown | undefined) =>
      request<T>('PATCH', endpoint, { body }),
    delete: <T>(endpoint: string, body: unknown | undefined) =>
      request<T>('DELETE', endpoint, { body }),
  };
}
