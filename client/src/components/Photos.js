import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { makeStyles } from '@material-ui/core/styles'
import { GridList, GridListTile, CircularProgress } from '@material-ui/core/'
import { SRLWrapper } from 'simple-react-lightbox'
import { apiKey, baseUrl } from '../secret.json'

const useStyles = makeStyles({
  spinner: {
    margin: 10,
  },
})

const Photos = ({ sol, rover, solControls, width }) => {
  const bottomRef = useRef()
  const classes = useStyles()

  const photosPerPage = 25
  const highlight = 7
  const cols = 3

  const getPhotos = async ({ pageParam = 1 }, r, s) => {
    const { data } = await axios.get(
      `${baseUrl}/rovers/${r}/photos?sol=${s}&page=${pageParam}&api_key=${apiKey}`
    )
    const nextPage = data.photos.length < photosPerPage ? undefined : pageParam + 1
    return { data, nextPage }
  }

  const photos = useInfiniteQuery(['photos', rover, sol], (p) => getPhotos(p, rover, sol), {
    getNextPageParam: (lastPage) => lastPage.nextPage,
    retry: 1,
  })

  useEffect(() => {
    const handleScroll = () => {
      if (
        bottomRef.current &&
        bottomRef.current.getBoundingClientRect().top < window.innerHeight &&
        photos.hasNextPage &&
        !photos.isLoading &&
        !photos.isFetchingNextPage
      )
        photos.fetchNextPage()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sol, photos])

  const getCellHeight = () => (isWidthUp('sm', width) ? 200 : 120)
  const getGridTileSize = (id) =>
    (id - (photos.data.pages[0].data.photos[0].id % highlight)) % highlight === 0 ? cols : 1

  return (
    <main>
      {photos.status === 'success' && (
        <SRLWrapper>
          <GridList cellHeight={getCellHeight()} cols={cols}>
            {photos.data.pages.map((page) =>
              page.data.photos.map((p) => (
                <GridListTile key={p.id} cols={getGridTileSize(p.id)} rows={getGridTileSize(p.id)}>
                  <img
                    src={p.img_src}
                    alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
                    className="MuiGridListTile-imgFullHeight"
                  />
                </GridListTile>
              ))
            )}
          </GridList>
          {photos.data.pages.length === 0 || photos.data.pages[0].data.photos.length === 0 ? (
            <div>No photos this sol</div>
          ) : (
            !photos.hasNextPage && solControls()
          )}
        </SRLWrapper>
      )}

      {(photos.status === 'loading' || photos.isFetchingNextPage) && (
        <CircularProgress size={30} className={classes.spinner} />
      )}
      {photos.status === 'error' && (
        <div>Nasa says no :( Try refreshing the page or come back later.</div>
      )}
      <div ref={bottomRef} />
    </main>
  )
}

Photos.propTypes = {
  sol: PropTypes.number.isRequired,
  rover: PropTypes.string.isRequired,
  solControls: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(Photos)
