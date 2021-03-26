import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core/'
import { apiKey, baseUrl } from './secret.json'
import Header from './components/Header'
import Photos from './components/Photos'
import theme from './styles/theme'

const App = () => {
  const rover = 'curiosity'

  const getMeta = async (r) => {
    const { data } = await axios.get(`${baseUrl}/manifests/${r}?api_key=${apiKey}`)
    return data
  }

  const meta = useQuery(['meta', rover], () => getMeta(rover))

  return meta ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="App" maxWidth="sm">
        {meta.status === 'loading' && <div>Loading, just a sec :)</div>}
        {meta.status === 'error' && (
          <div>Nasa says no :( Try refreshing the page or come back later.</div>
        )}
        {meta.status === 'success' && meta.data.photo_manifest.max_sol && (
          <>
            <Header sol={meta.data.photo_manifest.max_sol} />
            <main>
              <Photos sol={meta.data.photo_manifest.max_sol} rover={rover} />
            </main>
          </>
        )}
      </Container>
    </ThemeProvider>
  ) : null
}

App.propTypes = {}

export default App
