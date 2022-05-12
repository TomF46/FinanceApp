module.exports = {
    future: {},
    purge: [],
    theme: {
        extend: {},
        textColor: theme => ({
            ...theme('colors'),
            'primary': '#0096b4',
            'secondary': '#00b478',
            'danger': '#b41e00'
        }),
        backgroundColor: theme => ({
            ...theme('colors'),
            'primary': '#0096b4',
            'secondary': '#00b478',
            'danger': '#b41e00'
        })
    },
    variants: {},
    plugins: []
};
