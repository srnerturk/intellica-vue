module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      width: {
        30: "24px",
        60: "48px",
        70: "62px",
        180: "160px",
        500: "500px",
      },
      height: {
        40: "40px",
        60: "48px",
        80: "70px",
        300: "300px",
      },
      colors: {
        mifiblue: "#1C2749",
        mifired: "#D1264D",
        bordergray: "#EDEDED",
        overlay: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
