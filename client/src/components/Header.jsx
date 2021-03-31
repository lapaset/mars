import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Box } from '@material-ui/core/'
import { makeStyles, styled } from '@material-ui/core/styles'

const constants = {
  Curiosity: {
    viewBox: '0 0 550 110',
    fontSize: '94.5',
    x: 0,
    y: 80,
    quote: `Studying whether there's life on Mars or studying how the universe began, there's something magical about pushing back the frontiers of knowledge. That's something that is almost part of being human, and I'm certain that will continue.`,
    author: 'Sally Ride',
  },
  Opportunity: {
    viewBox: '0 0 550 85',
    fontSize: '70',
    x: 0,
    y: 60,
    quote: `Exploring and colonizing Mars can bring us new scientific understanding of climate change, of how planet-wide processes can make a warm and wet world into a barren landscape. By exploring and understanding Mars, we may gain key insights into the past and future of our own world.`,
    author: 'Buzz Aldrin',
  },
  Spirit: {
    viewBox: '0 0 550 110',
    fontSize: '100',
    x: 98,
    y: 83,
    quote: `We imagine going to the moon and planting a flag, going to an asteroid and mining, going to Mars and setting up a colony. And I think that expansionist mentality is very self-destructive, especially given the kind of precarious relationship we now have to the ecosystem here on Earth, because it allows us to imagine that Earth is disposable.`,
    author: 'Trevor Paglen',
  },
}

const QuoteBox = styled(Box)({
  borderRight: 'dotted 1px black',
  borderBottom: 'solid 1px black',
  borderLeft: 'dotted 1px white',
  borderTop: 'solid 1px white',
  color: 'black',
  padding: 15,
  marginTop: 10,
  marginBottom: 30,
})

const useStyles = makeStyles({
  title: {
    width: '100%',
    marginBottom: 0,
    marginTop: 20,
  },
  h1: {
    display: 'none',
  },
  metaContainer: {
    marginBottom: 20,
  },
  meta: {
    margin: '0 1rem',
  },
})

const Header = ({ meta }) => {
  const classes = useStyles()

  const info = constants[meta.name]

  return (
    <header className="App-header">
      <svg className={classes.title} viewBox={info.viewBox}>
        <text fontFamily="Krona One" fontSize={info.fontSize} x={info.x} y={info.y}>
          {meta.name}
        </text>
      </svg>
      <Typography variant="h1" align="right" className={classes.h1} gutterBottom>
        {meta.name}
      </Typography>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.metaContainer}
      >
        <Grid item className={classes.meta}>
          <Typography variant="body2">{`landing date: ${meta.landing_date}`}</Typography>
        </Grid>
        <Grid item className={classes.meta}>
          <Typography variant="body2">{`latest photos: ${meta.max_date}`}</Typography>
        </Grid>
      </Grid>

      <QuoteBox>
        <Typography variant="body1" align="right" gutterBottom>
          {info.quote}
        </Typography>
        <Typography variant="body2" align="right" gutterBottom>
          {`- ${info.author}`}
        </Typography>
      </QuoteBox>
    </header>
  )
}

Header.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object.isRequired,
}

export default Header
