import React from 'react'
import PropTypes from 'prop-types'

const Photo = ({ src, alt, className }) => <img src={src} alt={alt} className={className} />

Photo.defaultProps = {
  className: 'photo',
}

Photo.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default Photo
