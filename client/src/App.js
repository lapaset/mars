import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core/'
import { apiKey, baseUrl } from './secret.json'
import Header from './components/Header'
import Photos from './components/Photos'
import theme from './styles/theme'

const rover = 'curiosity'

const App = () => {
  const [sol, setSol] = useState(null)

  useEffect(async () => {
    const meta = await axios.get(`${baseUrl}/manifests/${rover}?api_key=${apiKey}`)
    setSol(meta.data.photo_manifest.max_sol)
  }, [])

  return sol ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="App" maxWidth="sm">
        <Header sol={sol} />
        <main>
          <Photos sol={sol} rover={rover} />
        </main>
      </Container>
    </ThemeProvider>
  ) : null
}

App.propTypes = {}

export default App
