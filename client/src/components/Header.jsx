import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core/'

export const title = 'Curiosity'
export const quote = `Exploring and colonizing Mars can bring us new scientific understanding of climate change, of
      how planet-wide processes can make a warm and wet world into a barren landscape. By exploring
      and understanding Mars, we may gain key insights into the past and future of our own world.`
export const author = 'Buzz Aldrin'

const Header = ({ sol }) => (
  <header className="App-header">
    <Typography variant="h1" align="right" gutterBottom>
      {title}
    </Typography>
    <Typography component="h2" variant="h2" align="right" gutterBottom>
      {`Sol ${sol}`}
    </Typography>
    <Typography variant="body1" align="right" gutterBottom>
      {quote}
    </Typography>
    <Typography variant="body2" align="right" gutterBottom>
      {author}
    </Typography>
  </header>
)

Header.propTypes = {
  sol: PropTypes.number.isRequired,
}

export default Header
