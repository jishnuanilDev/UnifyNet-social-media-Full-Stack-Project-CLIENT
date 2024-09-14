
import { nextui } from "@nextui-org/react";

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
 
  ],
  darkMode:'class',
  fontFamily: {
    'body': [
  'Inter', 
  'ui-sans-serif', 
  'system-ui', 
  '-apple-system', 
  'system-ui', 
  'Segoe UI', 
  'Roboto', 
  'Helvetica Neue', 
  'Arial', 
  'Noto Sans', 
  'sans-serif', 
  'Apple Color Emoji', 
  'Segoe UI Emoji', 
  'Segoe UI Symbol', 
  'Noto Color Emoji'
],
'sans': [
  'Inter', 
  'ui-sans-serif', 
  'system-ui', 
  '-apple-system', 
  'system-ui', 
  'Segoe UI', 
  'Roboto', 
  'Helvetica Neue', 
  'Arial', 
  'Noto Sans', 
  'sans-serif', 
  'Apple Color Emoji', 
  'Segoe UI Emoji', 
  'Segoe UI Symbol', 
  'Noto Color Emoji'
]
  },
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        customBlue: '#1DA1F2',
        customGreen: '#17BF63',
        customBlack:'#0a090a',
        sidebarBlack:'#0a0a0a',
        profileBlack:'#160024',
        postBox:'#1a1819',
        myViolet:'#d55adb',
        lightBlack:'#2f2f30',
        midBlack:'#141413',  
        dashboardCard:'#3a303d',
      }
    },
    transform: ['hover', 'focus'],
  },
  plugins: [nextui(), require('flowbite/plugin')],
};
export default config;