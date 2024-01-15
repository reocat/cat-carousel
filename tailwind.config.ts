
import type { Config } from 'tailwindcss'
const config:Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/admin/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            colors: {
                'default': '#ffdead',
            }
        },

        screens: {
            '2xl':
                {
                    'max':
                        '1535px'
                }
            ,
            // => @media (max-width: 1535px) { ... }

            'xl':
                {
                    'max':
                        '1279px'
                }
            ,
            // => @media (max-width: 1279px) { ... }

            'lg':
                {
                    'max':
                        '1023px'
                }
            ,
            // => @media (max-width: 1023px) { ... }

            'md':
                {
                    'max':
                        '767px'
                }
            ,
            // => @media (max-width: 767px) { ... }

            'sm':
                {
                    'max':
                        '639px'
                }
            ,
            // => @media (max-width: 639px) { ... }
        }
        ,
    },
    plugins: [],
}
export default config