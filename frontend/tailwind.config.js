/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#020316",
          gradient: "linear-gradient(180deg, #0f172a 0%, #020316 100%)",
        },
        primary: "#f472b6",
        secondary: "#6366f1",
        accent: "#22d3ee",
        glow: "#ec4899",
        text: {
          base: "#f3f4f6",
          muted: "#9ca3af",
          heading: "#ffffff",
          highlight: "#facc15",
        },
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Inter", "sans-serif"],
        special: ["'Press Start 2P'", "cursive"],
        sans: ["'Inter', sans-serif"],
        serif: ["'Inter', serif"],
        orbitron: ["Orbitron", "sans-serif"],
        bebas: ["Bebas Neue", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(236,72,153,0.15), 0 1.5px 8px 0 rgba(99,102,241,0.10)",
        neonPink: "0 0 16px 4px #ec4899",
        neonBlue: "0 0 16px 4px #22d3ee",
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      borderWidth: {
        glass: '1px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 1s ease-out',
        'slide-from-left': 'slideFromLeft 0.8s cubic-bezier(0.77,0,0.175,1)',
        'scale-on-hover': 'scaleOnHover 0.3s ease-in',
        'infinite-floating': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideFromLeft: {
          '0%': { opacity: 0, transform: 'translateX(-40px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        scaleOnHover: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      maxWidth: {
        'screen-xl': '1200px',
      },
      spacing: {
        'section': '4rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
