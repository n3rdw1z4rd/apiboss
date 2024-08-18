export type Data = { [key: string]: any };

export type ApiData = {
    error: boolean,
    status: number,
    statusText: string,
    payload: Data | null,
};

export class Api {
    private _locals: Data = {};

    private constructor() { }

    private _init(data: Data | null) {
        this._locals = data || {};

        document.title = this._locals.appTitle ?? 'ApiBoss';
    }

    private _fetch(path: string, options: RequestInit = {}, data?: ApiData): Promise<ApiData> {
        options = {
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
            ...options
        };

        return fetch(path, options)
            .then(async (response: Response) => ({
                error: !response.ok,
                status: response.status,
                statusText: response.statusText,
                payload: response.ok ? (await response.json()) as Data : null,
            }) as ApiData);
    }

    public getLocals(): Promise<ApiData> {
        return this._fetch(
            '/api',
            {
                method: 'POST',
            },
        ).then((data: ApiData) => {
            if (!data.error) {
                this._init(data.payload);
                return data;
            } else {
                throw `[${data.status}] Failed to fetch server data: ${data.statusText}`;
            }
        });
    }

    private static _instance: Api;

    public static get instance(): Api {
        if (!Api._instance) {
            Api._instance = new Api();
        }

        return Api._instance;
    }
}