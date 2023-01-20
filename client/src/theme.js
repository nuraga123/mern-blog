import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#4361ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
  shadows: Array(25).fill("none"),
  overrides: {
    MuiAppBar: {
      root: {
        "box-shadow": "none",
      },
    },
  },
});
