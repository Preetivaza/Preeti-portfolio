import type { Config } from "tailwindcss";
export default { content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
 theme: { extend: { fontFamily: { sans: ["var(--f-body)", "system-ui"], display: ["var(--f-display)", "system-ui"] }, colors: { accent: "#8b5cf6" } } },
 plugins: [] } satisfies Config;
