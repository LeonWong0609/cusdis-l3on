module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        'widget/**/*.svelte',
        'widget/components/Comment.svelte',
        'widget/components/Reply.svelte',
        'widget/theme.css'
      ],
      darkMode: 'class',
      variants: {
        extend: {
          outline: ['dark']
        }
      }
    },
    autoprefixer: {},
  },
};
