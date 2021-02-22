import React from 'react'
import PropTypes from 'prop-types'

const Photo = ({ src, alt }) => <img src={src} alt={alt} />

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
}

export default Photo
