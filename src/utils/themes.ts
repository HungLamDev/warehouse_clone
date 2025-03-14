import { createTheme } from '@mui/material/styles';
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#4263EB", 
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#934DE8", 
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#1A1B2E",
      paper: "#2A2B4A",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "rgba(19, 0, 0, 0.7)",
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

export default darkTheme;
