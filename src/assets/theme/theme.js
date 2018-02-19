import { createMuiTheme } from 'material-ui';

const defaultHeaderFont = 'Roboto';
const defaultFont = 'Roboto';

export default createMuiTheme({
  palette: {
    primary: {
      light: '#9248ff',
      main:  '#7a21ff',
      dark:  '#5400d2',
    },
    secondary: {
      light: '#ff8a50',
      main:  '#ff5722',
      dark:  '#c41c00',
    },
  },

  typography: {
    fontFamily: defaultFont,

    button: {
      fontWeight:    'bold',
      textTransform: 'capitalize',
      letterSpacing: '.4px',
    },

    display1: {
      fontFamily:    defaultHeaderFont,
      fontWeight:    300,
      fontSize:      '1.75rem',
      color:         '#fff',
      textTransform: 'uppercase',
    },

    display2: {
      fontFamily:    defaultHeaderFont,
      fontSize:      '2rem',
      fontWeight:    'bold',
      color:         '#fff',
      textTransform: 'uppercase',
      letterSpacing: '.8px',
    },

    display3: {
      fontFamily:    defaultHeaderFont,
      fontWeight:    'bold',
      textTransform: 'uppercase',
      color:         '#fff',
      lineHeight:    '1em',
      letterSpacing: '.1px',
    },

    display4: {
      fontFamily:    defaultHeaderFont,
      fontWeight:    'bold',
      textTransform: 'uppercase',
      color:         '#fff',
    },
  },
});
