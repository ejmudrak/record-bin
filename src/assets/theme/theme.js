import { createMuiTheme } from 'material-ui';

// palettes
import { blue, green } from 'material-ui/colors';

const defaultHeaderFont = 'Roboto';
const defaultFont = 'Roboto';

export default createMuiTheme({
  palette: {
    primary: {
      light: blue[300],
      main:  blue[500],
      dark:  blue[700],
    },

    secondary: {
      light: green[300],
      main:  green[500],
      dark:  green[700],
    },
  },

  typography: {
    button: {
      fontWeight: 'bold',
    },

    display1: {
      fontFamily: defaultHeaderFont,
    },

    display2: {
      fontFamily: defaultHeaderFont,
    },

    display3: {
      fontFamily: defaultHeaderFont,
    },

    display4: {
      fontFamily: defaultHeaderFont,
    },

    fontFamily: defaultFont,
    fontWeight: 'bold',

    headline: {
      fontFamily: defaultHeaderFont,
    },
  },
});
