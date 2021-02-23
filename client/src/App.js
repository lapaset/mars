import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { Typography, GridList, GridListTile } from '@material-ui/core/'
import { apiKey } from './secret.json'
import Photo from './components/Photo'
import theme from './styles/theme'

const baseUrl = 'https://api.nasa.gov/mars-photos/api/v1/'
const earthDate = '2021-2-20'

const App = (props) => {
  const [photos, setPhotos] = useState(null)

  useEffect(async () => {
    const data = await axios.get(
      `${baseUrl}rovers/curiosity/photos?earth_date=${earthDate}&api_key=${apiKey}`
    )
    // console.log('🚀 ~ file: App.js ~ line 16 ~ useEffect ~ data ', data)
    setPhotos(data.data.photos)
  }, [])

  const getGridListCols = () => {
    if (isWidthUp('xl', props.width)) return 11
    if (isWidthUp('lg', props.width)) return 9
    if (isWidthUp('md', props.width)) return 7
    if (isWidthUp('sm', props.width)) return 5
    return 3
  }

  const getGridTileSize = (id) => {
    const getSize = (a, b) => {
      if (id % a === 0) return 3
      if (id % b === 0) return 2
      return 1
    }

    if (isWidthUp('xl', props.width)) return getSize(3, 2)
    if (isWidthUp('lg', props.width)) return getSize(11, 2)
    if (isWidthUp('md', props.width)) return getSize(8, 3)
    if (isWidthUp('sm', props.width)) return getSize(7, 4)
    return id % 3 === 0 ? 2 : 1
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          <Typography variant="h1" align="right" gutterBottom>
            Mars
          </Typography>
          <Typography variant="body1" align="right" gutterBottom>
            Exploring and colonizing Mars can bring us new scientific understanding of climate
            change, of how planet-wide processes can make a warm and wet world into a barren
            landscape. By exploring and understanding Mars, we may gain key insights into the past
            and future of our own world.
          </Typography>
          <Typography variant="body2" align="right" gutterBottom>
            Buzz Aldrin
          </Typography>
        </header>
        <main>
          {photos && (
            <GridList cellHeight={160} className={theme.gridList} cols={getGridListCols()}>
              {photos.map((p) => (
                <GridListTile key={p.id} cols={getGridTileSize(p.id)} rows={getGridTileSize(p.id)}>
                  <Photo
                    src={p.img_src}
                    alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
                    className="MuiGridListTile-imgFullHeight"
                  />
                </GridListTile>
              ))}
            </GridList>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

App.propTypes = {
  width: PropTypes.string.isRequired,
}

export default withWidth()(App)
