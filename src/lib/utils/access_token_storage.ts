const accessTokenCookieName = "accessToken";

/**
 * Сохраняет accessToken в куку
 * @param accessToken - токен доступа
 */
export function SaveAccessToken(accessToken: string) {
    document.cookie = `${accessTokenCookieName}=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
}

/**
 * Получает accessToken из куки
 * @returns accessToken или null
 */
export function GetAccessToken(): string | null {
    const match = document.cookie.match(new RegExp(`(^| )${accessTokenCookieName}=([^;]+)`));
    const accessToken = match ? match[2] : null;
    return accessToken;
}

/**
 * Удаляет accessToken из куки
 */
export function DeleteAccessToken() {
    document.cookie = `${accessTokenCookieName}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; samesite=strict`;
}
