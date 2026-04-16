/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Plus Jakarta Sans", "sans-serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // Brand colours — baby blue + soft pink + white
        brand: {
          blue: "#4FC3F7",       // baby blue — primary
          "blue-dark": "#0288D1",
          "blue-light": "#E1F5FE",
          "blue-mid": "#29B6F6",
          pink: "#F48FB1",       // soft pink — accent
          "pink-dark": "#E91E8C",
          "pink-light": "#FCE4EC",
          "pink-mid": "#F06292",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          50: "#F8FBFF",
          100: "#F0F7FF",
          200: "#E3F2FD",
          300: "#BBDEFB",
        },
        text: {
          primary: "#1A1A2E",
          secondary: "#4A4A6A",
          muted: "#9090A8",
          light: "#B8B8CC",
        },
        border: {
          DEFAULT: "#E8EDF5",
          light: "#F0F4FA",
          blue: "rgba(79,195,247,0.25)",
          pink: "rgba(244,143,177,0.25)",
        },
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 24px rgba(79,195,247,0.15), 0 1px 4px rgba(0,0,0,0.06)",
        blue: "0 0 20px rgba(79,195,247,0.3)",
        pink: "0 0 20px rgba(244,143,177,0.3)",
        soft: "0 2px 12px rgba(0,0,0,0.08)",
        inner: "inset 0 1px 3px rgba(0,0,0,0.05)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "bounce-dot": {
          "0%,80%,100%": { transform: "translateY(0)", opacity: "0.4" },
          "40%": { transform: "translateY(-4px)", opacity: "1" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px) scale(0.96)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out forwards",
        "fade-in": "fade-in 0.3s ease-out forwards",
        float: "float 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "bounce-dot": "bounce-dot 1.2s ease-in-out infinite",
        "slide-up": "slide-up 0.3s cubic-bezier(0.16,1,0.3,1) forwards",
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #4FC3F7, #F48FB1)",
        "gradient-blue": "linear-gradient(135deg, #4FC3F7, #29B6F6)",
        "gradient-pink": "linear-gradient(135deg, #F48FB1, #F06292)",
        "gradient-soft": "linear-gradient(135deg, #E1F5FE, #FCE4EC)",
        "gradient-hero": "linear-gradient(160deg, #F0F8FF 0%, #FFF0F5 50%, #F0F8FF 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
