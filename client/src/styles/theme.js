import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    background: {
      default: 'palegreen',
    },
  },
  typography: {
    h1: {
      fontFamily: ['Krona One'],
    },
    h2: {
      fontFamily: ['Krona One'],
    },
    h3: {
      fontFamily: ['Krona One'],
    },
    body1: {
      fontFamily: ['Jura'],
      fontWeight: 700,
    },
    body2: {
      fontFamily: ['Jura'],
      fontWeight: 400,
    },
  },
})

export default theme
