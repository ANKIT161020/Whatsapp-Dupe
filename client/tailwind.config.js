/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Custom colors inspired by WhatsApp Web
      colors: {
        whatsappGreen: "#075E54", // Dark green for header
        whatsappLightGreen: "#128C7E", // Lighter green for accents
        whatsappBlue: "#34B7F1", // Blue for status/links
        whatsappBackground: "#ECE5DD", // Light background for chat area
        whatsappBubbleSent: "#D9FDD3", // Sent message bubble background
        whatsappBubbleReceived: "#FFFFFF", // Received message bubble background
        whatsappTextDark: "#333333",
        whatsappTextLight: "#666666",
        whatsappBorder: "#E0E0E0",
        whatsappSidebarBg: "#F0F2F5", // Sidebar background
        whatsappSearchBg: "#F0F2F5", // Search input background
        whatsappInputBg: "#F0F2F5", // Message input background
      },
      // Custom font for better WhatsApp resemblance
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Use Inter as the primary font
      },
    },
  },
  plugins: [],
};
