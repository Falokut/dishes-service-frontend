import { browser } from "$app/environment";
import type { Client } from "$lib/utils/client";
import { retrieveRawInitData } from "@telegram-apps/sdk-svelte";
import {
    SaveAccessToken,
    GetAccessToken,
    DeleteAccessToken,
} from "$lib/utils/access_token_storage";

const accessTokenKey = "access";
const accessTokenExpiresAtKey = "access_expire_at";
const refreshTokenKey = "refresh";
const refreshTokenExpiresAtKey = "refresh_expire_at";

const refreshAccessTokenEndpoint = "/auth/refresh_access_token";
const authByTelegramEndpoint = "/auth/login_by_telegram";

export class AuthRepository {
    constructor(private cli: Client) { }

    public async getAccessToken(): Promise<string> {
        if (!browser) return "";

        const accessToken = localStorage.getItem(accessTokenKey);
        const accessTokenExpiresAt = localStorage.getItem(accessTokenExpiresAtKey);

        if (
            accessToken &&
            accessTokenExpiresAt &&
            new Date(accessTokenExpiresAt) > new Date()
        ) {
            SaveAccessToken(accessToken);
            return accessToken;
        }

        const refreshToken = localStorage.getItem(refreshTokenKey);
        const refreshTokenExpiresAt = localStorage.getItem(refreshTokenExpiresAtKey);

        if (
            refreshToken &&
            refreshTokenExpiresAt &&
            new Date(refreshTokenExpiresAt) > new Date()
        ) {
            return await this.refreshAccessToken(refreshToken);
        }

        return await this.auth();
    }

    private async auth(): Promise<string> {
        const initDataRaw = retrieveRawInitData();
        if (!initDataRaw) {
            throw "undefined init data";
        }

        const resp = await this.cli
            .request()
            .setEndpoint(authByTelegramEndpoint)
            .setMethod("POST")
            .setJSONBody({ initTelegramData: initDataRaw })
            .send();

        if (!resp.ok) {
            DeleteAccessToken();
            return "";
        }

        const jsonResp = await resp.json();

        localStorage.setItem(accessTokenKey, jsonResp.accessToken.token);
        localStorage.setItem(accessTokenExpiresAtKey, jsonResp.accessToken.expiresAt);
        localStorage.setItem(refreshTokenKey, jsonResp.refreshToken.token);
        localStorage.setItem(refreshTokenExpiresAtKey, jsonResp.refreshToken.expiresAt);

        SaveAccessToken(jsonResp.accessToken.token);
        return jsonResp.accessToken.token;
    }

    private async refreshAccessToken(refreshToken: string): Promise<string> {
        const resp = await this.cli
            .request()
            .setEndpoint(refreshAccessTokenEndpoint)
            .setHeaders(this.cli.userBearerAuthHeader(refreshToken))
            .send();

        if (!resp.ok) {
            DeleteAccessToken();
            return "";
        }

        const jsonResp = await resp.json();

        localStorage.setItem(accessTokenKey, jsonResp.token);
        localStorage.setItem(accessTokenExpiresAtKey, jsonResp.expiresAt);

        SaveAccessToken(jsonResp.token);
        return jsonResp.token;
    }
}
