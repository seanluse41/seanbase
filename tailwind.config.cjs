const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

    plugins: [require('flowbite/plugin')],

    darkMode: 'class',

    theme: {
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: '#FFF5F2',
                    100: '#FFF1EE',
                    200: '#FFE4DE',
                    300: '#FFD5CC',
                    400: '#FFBCAD',
                    500: '#FE795D',
                    600: '#EF562F',
                    700: '#EB4F27',
                    800: '#CC4522',
                    900: '#A5371B'
                },
                lavender: {
                    50:  '#CCB0D8',
                    100: '#CCB0D8',
                    200: '#CCB0D8',
                    300: '#CCB0D8',
                    400: '#CCB0D8',
                    500: '#CCB0D8',
                    600: '#CCB0D8',
                    700: '#CCB0D8',
                    800: '#CCB0D8',
                    900: '#CCB0D8'
                },
                slate: {
                    50:  '#3C3D36',
                    100: '#3C3D36',
                    200: '#3C3D36',
                    300: '#3C3D36',
                    400: '#3C3D36',
                    500: '#3C3D36',
                    600: '#3C3D36',
                    700: '#3C3D36',
                    800: '#3C3D36',
                    900: '#3C3D36'
                },
                orangeGold: {
                    50:  '#DCA320',
                    100: '#DCA320',
                    200: '#DCA320',
                    300: '#DCA320',
                    400: '#DCA320',
                    500: '#DCA320',
                    600: '#DCA320',
                    700: '#DCA320',
                    800: '#DCA320',
                    900: '#DCA320'
                },
                slateLite: {
                    50:  '#565950',
                    100: '#565950',
                    200: '#565950',
                    300: '#565950',
                    400: '#565950',
                    500: '#565950',
                    600: '#565950',
                    700: '#565950',
                    800: '#565950',
                    900: '#565950'
                },
                purple: {
                    50:  '#8E6BA5',
                    100: '#8E6BA5',
                    200: '#8E6BA5',
                    300: '#8E6BA5',
                    400: '#8E6BA5',
                    500: '#8E6BA5',
                    600: '#8E6BA5',
                    700: '#8E6BA5',
                    800: '#8E6BA5',
                    900: '#8E6BA5'
                }
            }
        }
    }
};

module.exports = config;