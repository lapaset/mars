import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'

const typography = {
  h1: {
    fontFamily: ['Krona One'],
    wordWrap: 'break-word',
  },
  h2: {
    fontFamily: ['Krona One'],
  },
  h3: {
    fontFamily: ['Krona One'],
    fontSize: 25,
  },
  body1: {
    fontFamily: ['Jura'],
    fontWeight: 700,
  },
  body2: {
    fontFamily: ['Jura'],
    fontWeight: 400,
  },
}

const curiosityTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    background: {
      default: 'palegreen',
    },
  },
  typography,
})

const opportunityTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    background: {
      default: 'thistle',
    },
  },
  typography,
})

const spiritTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#000',
    },
    background: {
      default: '#afedd2',
    },
  },
  typography,
})

export default {
  curiosityTheme: responsiveFontSizes(curiosityTheme),
  opportunityTheme: responsiveFontSizes(opportunityTheme),
  spiritTheme: responsiveFontSizes(spiritTheme),
}
