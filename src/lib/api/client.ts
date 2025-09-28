const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function retryWithBackoff<T>(
    fn: () => Promise<T>,
    maxRetries = 5,
    baseDelay = 300
): Promise<T> {
    let attempt = 0;
    while (true) {
        try {
            return await fn();
        } catch (err) {  
            attempt++;
            if (attempt > maxRetries) throw err;

            const jitter = Math.random() * 100;
            const delay = baseDelay * 2 ** (attempt - 1) + jitter;
            console.warn(`⏳ Ошибка запроса, повтор через ${Math.round(delay)} мс...`);

            await sleep(delay);
        }
    }
}

class ApiClient {
    private baseURL: string = '/api';

    private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        return retryWithBackoff(async () => {
            const url = `${this.baseURL}${endpoint}`;
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });

            if (!response.ok) {
                if (response.status === 429 || response.status === 503) {
                    throw { status: response.status, message: response.statusText };
                }
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        });
    }

    async get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    async post<T>(endpoint: string, data: object): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }

    async patch<T>(endpoint: string, data: object): Promise<T> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
        });
    }

    async delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const apiClient = new ApiClient();