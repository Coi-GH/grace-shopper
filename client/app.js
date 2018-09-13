import React from 'react'
import { Navbar } from './components'
import Routes from './routes'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffd740'
    },
    secondary: {
      main: '#2c387e'
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
