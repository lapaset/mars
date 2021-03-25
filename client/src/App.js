import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Container, GridList, GridListTile } from '@material-ui/core/'
import { apiKey } from './secret.json'
import Header from './components/Header'
import Photo from './components/Photo'
import theme from './styles/theme'

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1'
const photosPerPage = 25
const rover = 'curiosity'

const App = (props) => {
  const [photos, setPhotos] = useState(null)
  const [sol, setSol] = useState(null)
  const getGridListCols = () => (isWidthUp('sm', props.width) ? 6 : 3)
  const lastPhotoRef = useRef()
  const pageRef = useRef(1)
  const loadingRef = useRef(false)

  useEffect(async () => {
    const meta = await axios.get(`${baseUrl}/manifests/${rover}?api_key=${apiKey}`)
    setSol(meta.data.photo_manifest.max_sol)
  }, [])

  useEffect(async () => {
    if (!sol) return
    const { data } = await axios.get(
      `${baseUrl}/rovers/${rover}/photos?sol=${sol}&page=${pageRef.current}&api_key=${apiKey}`
    )
    pageRef.current = data.photos.length < photosPerPage ? null : pageRef.current + 1
    setPhotos(data.photos)
  }, [sol])

  useEffect(() => {
    const handleScroll = async () => {
      if (
        loadingRef.current ||
        !sol ||
        !photos ||
        !pageRef.current ||
        !lastPhotoRef ||
        lastPhotoRef.current.getBoundingClientRect().top > window.innerHeight
      )
        return

      try {
        loadingRef.current = true
        const { data } = await axios.get(
          `${baseUrl}/rovers/${rover}/photos?sol=${sol}&page=${pageRef.current}&api_key=${apiKey}`
        )
        if (data.photos.length > 0) setPhotos(photos.concat(data.photos))
        pageRef.current = data.photos.length < photosPerPage ? null : pageRef.current + 1
        loadingRef.current = false
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('Error loading more photos', e)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sol, photos])

  const getGridTileSize = (id) => {
    const getSizeBig = () => {
      if (id % 7 === 0) return getGridListCols()
      return 2
    }

    if (isWidthUp('sm', props.width)) return getSizeBig()
    return id % 3 === 0 ? 2 : 1
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="App" maxWidth="sm">
        {sol && <Header sol={sol} />}
        <main>
          {photos && (
            <GridList cellHeight={100} className={theme.gridList} cols={getGridListCols()}>
              {photos.map((p, i) =>
                i === photos.length - 1 ? (
                  <GridListTile
                    key={p.id}
                    cols={getGridTileSize(p.id)}
                    rows={getGridTileSize(p.id)}
                  >
                    <div ref={lastPhotoRef} />
                    <Photo
                      src={p.img_src}
                      alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
                      className="MuiGridListTile-imgFullHeight"
                    />
                  </GridListTile>
                ) : (
                  <GridListTile
                    key={p.id}
                    cols={getGridTileSize(p.id)}
                    rows={getGridTileSize(p.id)}
                  >
                    <Photo
                      src={p.img_src}
                      alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
                      className="MuiGridListTile-imgFullHeight"
                    />
                  </GridListTile>
                )
              )}
            </GridList>
          )}
        </main>
      </Container>
    </ThemeProvider>
  )
}

App.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(App)
