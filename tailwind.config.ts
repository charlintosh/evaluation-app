import type { Config } from 'tailwindcss';

const withMT = require('@material-tailwind/react/utils/withMT');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: {
        100: '#265183',
        200: '#C9E1EA',
        300: '#d1ebf2',
        400: '#E1EFF2',
      },
    },
    extend: {
      boxShadow: {
        ks: '1px -4px 0px -2px #C9CACB inset',
        card: '0px 3px 10px 0px #1E326B33',
        'card-hover': '3px 3px 4px 0px #5D96AA40',
      },
    },
  },
  plugins: [],
};
export default withMT(config);
