import { AuthRepository } from '$lib/repository/auth';
import { apiFetch } from "./fetch";

class RequestBuilder {
    private method: string = 'GET';
    private url: string = '';
    private headers: Headers = new Headers();
    private queryParams: Record<string, string> = {};
    private body?: BodyInit;
    private withAuth: boolean = false;

    constructor(private baseUrl: string, private authRepo?: IAuthRepo) { }

    setMethod(method: string): this {
        this.method = method;
        return this;
    }

    setEndpoint(endpoint: string): this {
        this.url = endpoint;
        return this;
    }

    setHeaders(headers: HeadersInit): this {
        if (headers instanceof Headers) {
            this.headers = headers;
        } else {
            this.headers = new Headers(headers);
        }
        return this;
    }

    addHeader(key: string, value: string): this {
        this.headers.append(key, value);
        return this;
    }

    setQueryParams(params: Record<string, string>): this {
        this.queryParams = params;
        return this;
    }

    setJSONBody(obj: unknown): this {
        this.body = JSON.stringify(obj);
        this.addHeader('Content-Type', 'application/json');
        return this;
    }

    auth(): this {
        if (!this.authRepo) {
            throw new Error("Auth repo not provided");
        }
        this.withAuth = true
        return this;
    }

    async send(): Promise<Response> {
        let fullUrl = this.baseUrl + this.url;
        if (Object.keys(this.queryParams).length > 0) {
            const queryString = new URLSearchParams(this.queryParams).toString();
            fullUrl += `?${queryString}`;
        }
        if (this.withAuth && this.authRepo) {
            const token = await this.authRepo.getAccessToken();
            this.addHeader('Authorization', `Bearer ${token}`);
        }

        const reqOptions: RequestInit = {
            method: this.method,
            headers: this.headers,
            body: this.body,
        };
        return apiFetch(fullUrl, reqOptions);
    }
}

export interface IAuthRepo {
    getAccessToken(): Promise<string>
}

export class Client {
    authRepo: IAuthRepo;

    constructor(private baseUrl: string) {
        this.baseUrl = baseUrl;
        this.authRepo = new AuthRepository(this)
    }

    request(): RequestBuilder {
        return new RequestBuilder(this.baseUrl, this.authRepo);
    }

    userBearerAuthHeader(token: string): Headers {
        const headers = new Headers();
        headers.set("Authorization", `Bearer ${token}`);
        return headers;
    }
}


