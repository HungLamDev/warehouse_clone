// import { createTheme } from "@mui/material";
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#bbdefb" },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // Disabled ripple animation on button component
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
    create: () => {
      return "none"; // Disable transitions at all components
    },
  },
});
