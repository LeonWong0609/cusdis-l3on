module.exports = {
    content: [
        'widget/**/*.svelte',
        'widget/components/Comment.svelte',
        'widget/components/Reply.svelte',
        'widget/theme.css',
    ],
    safelist: [
        'dark:!border-gray-600/50',
        'dark:bg-[#191919]',
        'border-gray-200/50',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
