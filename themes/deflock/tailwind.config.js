/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Paths are resolved relative to the CLI's working directory (the site
    // root), not this config file, since the theme has no build step of its
    // own — see package.json build:css at the repo root.
    "./themes/deflock/layouts/**/*.html",
    "./content/**/*.md",
  ],
  theme: {
    extend: {
      colors: {
        // "Evidence dossier" palette: warm plate-white ground, ink for
        // reading, a single red accent for alerts/CTAs (hotlist red), plus
        // two narrow-purpose tones — citation amber for pending/update
        // states and scanner green reserved for the dark capture panel.
        ink: {
          900: "#16160F",
          700: "#3B3A30",
          500: "#63614F",
        },
        accent: {
          700: "#8F1414",
          600: "#C81E1E",
          500: "#E23636",
        },
        plate: {
          DEFAULT: "#F1EFE6",
          dark: "#E7E2D2",
        },
        citation: {
          DEFAULT: "#B9791A",
          light: "#F1DBA8",
        },
        scanner: {
          DEFAULT: "#1F7A43",
          light: "#D9EDE1",
          phosphor: "#4CFF83",
        },
        panel: "#12140F",
      },
      fontFamily: {
        // UI/display default (Tailwind's preflight applies this to <html>).
        // Overpass traces back to Highway Gothic, the US road-sign
        // typeface — deliberate, since the subject is street-level
        // surveillance hardware.
        sans: ["Overpass", "ui-sans-serif", "system-ui", "sans-serif"],
        // Long-form reading face for prose paragraphs: a plain, credible
        // serif stack with zero extra network cost.
        serif: ["Iowan Old Style", "Palatino Linotype", "Georgia", "Cambria", "serif"],
        // Data/technical face: timestamps, plate reads, citation numbers,
        // changelog dates.
        mono: ["\"Overpass Mono\"", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
