import React from 'react'
import { Navbar } from './components'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(',')
  },
  palette: {
    primary: {
      main: '#eb8666'
    },
    secondary: {
      main: '#000'
    }
  }
})

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </MuiThemeProvider>
  )
}

export default App
