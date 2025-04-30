const config = {
    mode: 'jit',
    purge: {
        enabled: true,
        content: [
            './src/**/*.{js,ts,jsx,tsx}',
            './src/**/*.{js,ts,jsx,tsx}',
        ],
    },
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
    ],

    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#8fffb4',
                    100: '#e7feee',
                    200: '#cffcde',
                    300: '#a8fac3',
                    400: '#51f688',
                    500: '#0BDA51',       // основная зелёная кнопка
                    600: '#08a03b',
                    700: '#06742b',
                    800: '#044419',
                    900: '#02220c'
                },
                secondary: {
                    50: '#fff8f2',
                    100: '#ffeedd',
                    200: '#ffd5b8',
                    300: '#ffb57a',
                    400: '#ff9138',
                    500: '#ff7a00',      // оранжевый акцент
                    600: '#cc6100',
                    700: '#a34d00',
                    800: '#6e3200',
                    900: '#3f1d00'
                },
                'app-light': '#8fffb4',
                'app-dark': '#1e2939',
                destructive: {
                    DEFAULT: '#ff4747',
                    dark: '#a80000'
                },
            }
        }
    },

    plugins: [require('flowbite/plugin')],
    darkMode: 'class'
};

module.exports = config;