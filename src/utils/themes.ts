import { createTheme } from '@mui/material';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4263EB", // Xanh dương đậm, gần với điểm đầu của gradient (66, 99, 235)
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#934DE8", // Tím nhạt, gần với điểm cuối của gradient (147, 77, 232)
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#1A1B2E", // Xám tím đậm, tối hơn #9e9e9e, hợp với gradient
      paper: "#2A2B4A", // Tông tím xám nhẹ, phù hợp với glassmorphism
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        InputLabelProps: {
          shrink: true,
        },
      },
    },
  },
  transitions: {
    create: () => "none",
  },
});