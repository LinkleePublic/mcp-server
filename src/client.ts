const API_URL = process.env.LINKLEE_API_URL || 'https://api.linklee.ru';
const API_KEY = process.env.LINKLEE_API_KEY || '';

interface RequestOptions {
  method?: string;
  body?: unknown;
  params?: Record<string, string>;
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, params } = options;

  const url = new URL(`/api/v1${path}`, API_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value);
    }
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  };

  const response = await fetch(url.toString(), {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Linklee API error ${response.status}: ${errorBody}`);
  }

  return response.json() as Promise<T>;
}
