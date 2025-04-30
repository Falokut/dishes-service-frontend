type ServerError = {
    errorMessage: string;
    details?: Record<string, any>;
};

export async function apiFetch(url: string, options: RequestInit = {}) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            return response
        }

        let errorData: ServerError = { errorMessage: 'Неизвестная ошибка' };

        const text = await response.text();
        if (text) {
            try {
                errorData = JSON.parse(text);
            } catch (jsonError) {
                console.warn('Некорректный JSON в ответе:', text);
                errorData.errorMessage = `Ошибка парсинга JSON: ${jsonError}`;
            }
        } else {
            errorData.errorMessage = 'Сервер вернул пустой ответ';
        }

        let errorMsg = errorData.errorMessage;
        if (errorData.details) {
            const details = Object.entries(errorData.details)
                .map(([_, value]) => `${value}`)
                .join(', ');
            errorMsg = ` ${details}`;
        }
        throw new Error(errorMsg);
    } catch (error: any) {
        const message = error?.message || 'Неизвестная ошибка';
        console.error('Сетевая ошибка или проблема с API:', error);
        throw new Error(message);
    }
}