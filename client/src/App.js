import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core/'

import { apiKey, baseUrl } from './secret.json'
import RoverMenu from './components/RoverMenu'
import Header from './components/Header'
import Photos from './components/Photos'
import theme from './styles/theme'
import SolControls from './components/SolControls'

const App = () => {
  const [rover, setRover] = useState('curiosity')
  const [sol, setSol] = useState(null)

  const getMeta = async (r) => {
    const { data } = await axios.get(`${baseUrl}/manifests/${r}?api_key=${apiKey}`)
    return data
  }

  const meta = useQuery(['meta', rover], () => getMeta(rover), {
    retry: 1,
  })

  const solControls = () => (
    <SolControls sol={sol} setSol={setSol} maxSol={meta.data.photo_manifest.max_sol} />
  )

  useEffect(() => {
    if (sol === null && meta && meta.data && meta.data.photo_manifest.max_sol)
      setSol(meta.data.photo_manifest.max_sol)
  }, [meta])

  return meta ? (
    <ThemeProvider theme={theme[`${rover}Theme`]}>
      <CssBaseline />
      <RoverMenu rover={rover} setRover={setRover} setSol={setSol} />

      <Container maxWidth="sm">
        {meta.status === 'loading' && <div>Loading, just a sec :)</div>}
        {meta.status === 'error' && (
          <div>Nasa says no :( Try refreshing the page or come back later.</div>
        )}
        {meta.status === 'success' && sol && (
          <>
            <Header meta={meta.data.photo_manifest} />
            {solControls()}
            <Photos sol={sol} rover={rover} solControls={solControls} />
          </>
        )}
      </Container>
    </ThemeProvider>
  ) : null
}

App.propTypes = {}

export default App
