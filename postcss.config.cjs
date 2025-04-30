const tailwindcss = require("@tailwindcss/postcss");
const autoprefixer = require("autoprefixer");
const postcssimport = require('postcss-import');

const config = {
    plugins: [
        postcssimport,
        //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
        tailwindcss({
            config: './tailwind.config.cjs',
        }),
        //But others, like autoprefixer, need to run after,
        autoprefixer,
    ],
};

module.exports = config;