import React, { useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core/'
import { apiKey, baseUrl } from './secret.json'
import Header from './components/Header'
import Photos from './components/Photos'
import theme from './styles/theme'
import SolControls from './components/SolControls'

const App = () => {
  const rover = 'curiosity'
  const [sol, setSol] = useState(null)

  const getMeta = async (r) => {
    const { data } = await axios.get(`${baseUrl}/manifests/${r}?api_key=${apiKey}`)
    return data
  }

  const meta = useQuery(['meta', rover], () => getMeta(rover), {
    retry: 1,
  })

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
            <Header sol={sol || meta.data.photo_manifest.max_sol} />
            <SolControls
              sol={sol || meta.data.photo_manifest.max_sol}
              setSol={setSol}
              maxSol={meta.data.photo_manifest.max_sol}
            />
            <Photos sol={sol || meta.data.photo_manifest.max_sol} rover={rover} />
          </>
        )}
      </Container>
    </ThemeProvider>
  ) : null
}

App.propTypes = {}

export default App
