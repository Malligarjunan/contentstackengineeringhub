import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'contentstack': {
          purple: '#6C5CE7',
          'purple-dark': '#5849d4',
          teal: '#00CEC9',
          blue: '#0984E3',
          orange: '#E17055',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;

