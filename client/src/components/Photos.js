import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { GridList, GridListTile } from '@material-ui/core/'
import { apiKey, baseUrl } from '../secret.json'
import theme from '../styles/theme'

const Photos = ({ sol, rover, width }) => {
  const bottomRef = useRef()

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
        !photos.isLoading &&
        !photos.isFetchingNextPage &&
        photos.hasNextPage &&
        bottomRef.current &&
        bottomRef.current.getBoundingClientRect().top < window.innerHeight
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
    <>
      {photos.status === 'success' && (
        <GridList cellHeight={getCellHeight()} className={theme.gridList} cols={cols}>
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
          <div ref={bottomRef} />
        </GridList>
      )}
      {(photos.status === 'loading' || photos.isFetchingNextPage) && <div>loading</div>}
      {photos.status === 'error' && (
        <div>Nasa says no :( Try refreshing the page or come back later.</div>
      )}
    </>
  )
}

Photos.propTypes = {
  sol: PropTypes.number.isRequired,
  rover: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(Photos)
