import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';


const white = '#FFFFFF';
const black = '#000000';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    black,
    white,
    primary: {
      contrastText: white,
      dark: colors.indigo[900],
      main: '#00BCD4',
      light: colors.indigo[100],
    },
    secondary: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue['A400'],
      light: colors.blue['A400']
    },
    success: {
      contrastText: white,
      dark: colors.green[900],
      main: colors.green[600],
      light: colors.green[400]
    },
    info: {
      contrastText: white,
      dark: colors.blue[900],
      main: colors.blue[600],
      light: colors.blue[400]
    },
    warning: {
      contrastText: white,
      dark: colors.orange[900],
      main: colors.orange[600],
      light: colors.orange[400]
    },
    error: {
      contrastText: white,
      dark: colors.red[900],
      main: colors.red[600],
      light: colors.red[400]
    },
    text: {
      primary: colors.blueGrey[800],
      secondary: colors.grey[500],
      link: colors.blue[600]
    },
    background: {
      // default: '#F4F6F8',
      // geändert von chris, damit das generelle background weiß ist, (ist der farbcode richtig?)
      default: '#FFFFFF',
      paper: white,
      blue: '#00BCD4',
    },
    icon: colors.blueGrey[600],
    divider: colors.grey[200],
    },
    typography: {
      // fontFamily: "'Montserrat', sans-serif;"
    },
    overrides: {
      MuiBottomNavigationAction: {
        root: {
          '&$selected': {
            color: 'white',
          },
        }
      }
    }
});
export default theme;