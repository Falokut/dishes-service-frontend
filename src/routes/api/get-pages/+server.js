import { defaultClient } from '$lib/app/defaults';
import { json } from '@sveltejs/kit';


const pagesByRole = {
    admin: [
        {
            url: "/dishes",
            prettyName: "Заказать",
        },
        {
            url: "/admin/dishes",
            prettyName: "Блюда",
        },
        {
            url: "/admin/dish_category",
            prettyName: "Категории",
        },
        {
            url: "/admin/restaurant",
            prettyName: "Рестораны",
        },
        {
            url: "/my-orders",
            prettyName: "Мои заказы",
        },
    ],
    user: [
        {
            url: "/dishes",
            prettyName: "Заказать",
        },
        {
            url: "/my-orders",
            prettyName: "Мои заказы",
        },
    ]
};

/** @type {import('../../$types').RequestHandler} */
export async function POST({ cookies }) {
    try {
        const accessToken = cookies.get("accessToken");
        if (!accessToken) {
            return json({ roleName: "guest", pages: pagesByRole["guest"] });
        }

        const res = await defaultClient.request()
            .setEndpoint('/auth/user_role')
            .setHeaders(defaultClient.userBearerAuthHeader(accessToken))
            .send()
        if (!res.ok) {
            return json({ error: 'Failed to fetch role' }, { ok: false, status: res.status });
        }

        const roleResp = await res.json()
        const roleName = roleResp.roleName;

        return json({ roleName, pages: pagesByRole[roleName] });
    } catch (error) {
        return json({ error: 'Server error', details: error.message }, { status: 500 });
    }
}