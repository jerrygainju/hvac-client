import { default as flattenColorPalette } from "tailwindcss/lib/util/flattenColorPalette";
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/**/*.{js,ts,jsx,tsx,mdx}"
],
darkMode: "class",
  theme: {
    colors: {
      'black': '#001529',
    },
    extend: {},
  },
  plugins: [addVariablesForColors],
  
}
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}

