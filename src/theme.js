import { createTheme } from "@mui/material";

export default function getTheme(type) {
  if (type === "dark") {
    return createTheme({
      direction: "rtl",
      palette: {
        type: "dark",
        primary: {
          main: "#ef404f",
          900: "#b7001a",
          800: "#c60026",
          700: "#d3002d",
          600: "#e51533",
          500: "#f42334",
          400: "#ef404f",
          300: "#e56871",
          200: "#ef9399",
          100: "#ffc9d2",
          50: "#ffeaee",
        },
        secondary: {
          main: "#ef404f",
        },
        divider: {
          main: "rgba(255, 255, 255, 0.12)",
        },
        text: {
          primary: "#fff",
          secondary: "rgba(255, 255, 255, 0.7)",
          disabled: "rgba(255, 255, 255, 0.5)",
          hint: "rgba(255, 255, 255, 0.5)",
        },
        background: {
          default: "#303030",
          paper: "#424242",
        },
      },
    });
  } else {
    return createTheme({});
  }
}
