import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useInfiniteQuery } from 'react-query'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth'
import { GridList, GridListTile } from '@material-ui/core/'
import { apiKey, baseUrl } from '../secret.json'
import theme from '../styles/theme'

const Photos = ({ sol, rover, width }) => {
  const [photos, setPhotos] = useState(null)
  const lastPhotoRef = useRef()
  const pageRef = useRef(1)
  const loadingRef = useRef(false)
  const moduloRef = useRef(0)

  const photosPerPage = 25
  const highlight = 7
  const cols = 3

  const getPhotos = async (r, s, page = 1) => {
    const { data } = await axios.get(
      `${baseUrl}/rovers/${r}/photos?sol=${s}&page=${page}&api_key=${apiKey}`
    )
    const nextPage = data.photos.length < photosPerPage ? null : page + 1
    return { data, nextPage }
  }

  const images = useInfiniteQuery(['photos', { rover, sol }], () => getPhotos(rover, sol), {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  })

  console.log('images', images)

  useEffect(async () => {
    if (!sol) return
    const { data } = await axios.get(
      `${baseUrl}/rovers/${rover}/photos?sol=${sol}&page=${pageRef.current}&api_key=${apiKey}`
    )
    pageRef.current = data.photos.length < photosPerPage ? null : pageRef.current + 1
    if (data.photos.length === 0) return
    moduloRef.current = data.photos[0].id % highlight
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

  const getCellHeight = () => (isWidthUp('sm', width) ? 200 : 120)
  const getGridTileSize = (id) =>
    moduloRef.current !== null && (id - moduloRef.current) % highlight === 0 ? cols : 1

  return photos ? (
    <GridList cellHeight={getCellHeight()} className={theme.gridList} cols={cols}>
      {photos.map((p, i) => (
        <GridListTile key={p.id} cols={getGridTileSize(p.id)} rows={getGridTileSize(p.id)}>
          {i === photos.length - 1 && <div ref={lastPhotoRef} />}
          <img
            src={p.img_src}
            alt={`${p.rover.name} ${p.camera.full_name} ${p.earth_date}`}
            className="MuiGridListTile-imgFullHeight"
          />
        </GridListTile>
      ))}
    </GridList>
  ) : null
}

Photos.propTypes = {
  sol: PropTypes.number.isRequired,
  rover: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
}

export default withWidth()(Photos)
