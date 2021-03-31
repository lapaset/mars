import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Box } from '@material-ui/core/'
import { makeStyles, styled } from '@material-ui/core/styles'

export const quote = `Exploring and colonizing Mars can bring us new scientific understanding of climate change, of
      how planet-wide processes can make a warm and wet world into a barren landscape. By exploring
      and understanding Mars, we may gain key insights into the past and future of our own world.`
export const author = 'Buzz Aldrin'

const QuoteBox = styled(Box)({
  borderRight: 'dotted 1px black',
  borderBottom: 'solid 1px black',
  borderLeft: 'dotted 1px white',
  borderTop: 'solid 1px white',

  color: 'black',
  padding: 15,
  marginTop: 10,
  marginBottom: 10,
})

const useStyles = makeStyles({
  title: {
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  h1: {
    display: 'none',
  },
})

const Header = ({ meta }) => {
  const classes = useStyles()

  const titles = {
    Curiosity: { viewBox: '0 0 550 110', fontSize: '94.5', x: 0, y: 80 },
    Opportunity: { viewBox: '0 0 550 85', fontSize: '70', x: 0, y: 60 },
    Spirit: { viewBox: '0 0 550 110', fontSize: '100', x: 197.5, y: 83 },
  }

  return (
    <header className="App-header">
      <svg className={classes.title} viewBox={titles[meta.name].viewBox}>
        <text
          fontFamily="Krona One"
          fontSize={titles[meta.name].fontSize}
          x={titles[meta.name].x}
          y={titles[meta.name].y}
        >
          {meta.name}
        </text>
      </svg>
      <Typography variant="h1" align="right" className={classes.h1} gutterBottom>
        {meta.name}
      </Typography>
      <QuoteBox>
        <Typography variant="body1" align="right">
          {`landing date: ${meta.landing_date}`}
          <br />

          {`latest photos: ${meta.max_date}`}
        </Typography>
      </QuoteBox>
      {/*     <QuoteBox>
      <Typography variant="body1" align="right" gutterBottom>
        {quote}
      </Typography>
      <Typography variant="body2" align="right" gutterBottom>
        {author}
      </Typography>
    </QuoteBox> */}
    </header>
  )
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object.isRequired,
}

export default Header
