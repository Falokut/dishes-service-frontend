import { defaultClient } from '$lib/app/defaults';
import { redirect } from '@sveltejs/kit';

const allowedByDefaultPages = ["/", "/access-denied", "/error"];
const allowedUrlByRoles = {
    admin: ["/cart", "/dishes", "orders", "/admin"],
    user: ["/cart", "/dishes", "orders"],
};

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const accessToken = event.cookies.get('accessToken');
    const currentUrl = event.url.pathname;

    try {
        const res = await isAllowed(accessToken, currentUrl);
        if (!res.allowed) {
            throw redirect(303, '/access-denied');
        }
        return resolve(event);
    } catch (error) {
        console.error('Ошибка при проверке доступа:', error);
        throw redirect(303, '/error');
    }
}

async function isAllowed(accessToken, url) {
    try {
        if (allowedByDefaultPages.some(allowedUrl => url.startsWith(allowedUrl))) {
            return { allowed: true };
        }

        let roleName = 'guest';

        if (accessToken) {
            const res = await defaultClient.request()
                .setEndpoint('/has_admin_privileges')
                .setHeaders(defaultClient.userBearerAuthHeader(accessToken))
                .send()
            if (!res.ok) {
                return { allowed: false, error: 'Failed to fetch role' };
            }

            const hasPrivilegesResp = await res.json()
            roleName = hasPrivilegesResp.hasAdminPrivileges ? "admin" : "user";
        }

        const allowedPaths = allowedUrlByRoles[roleName] || [];
        const allowed = allowedPaths.some(allowedUrl => url.startsWith(allowedUrl));
        return { allowed };

    } catch (error) {
        return { allowed: false, error: 'Server error', details: error.message };
    }
}
