const glob = require('glob');

/** @type {import('tailwindcss').Config} */
module.exports = {
    // content: ["./src/**/*.{html,ts}"],
    // 解决angular 12下 使用 scss + tailwindcss 时，tailwindcss 不能热更新的问题
    // 不能热更新的问题: https://github.com/tailwindlabs/tailwindcss/issues/6553#issuecomment-1269724237
    content: [...glob.sync('./src/**/*.{html,ts,scss}')],
};
