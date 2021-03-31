import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Typography } from '@material-ui/core/'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowForward from '@material-ui/icons/ArrowForward'

const ControlButton = ({ sol, setSol, start }) =>
  sol && (
    <Button
      onClick={() => setSol(sol)}
      startIcon={start ? <ArrowBack /> : false}
      endIcon={start ? false : <ArrowForward />}
    >
      <Typography variant="body1">{`sol ${sol}`}</Typography>
    </Button>
  )

ControlButton.defaultProps = {
  sol: null,
  start: false,
}

ControlButton.propTypes = {
  sol: PropTypes.number,
  setSol: PropTypes.func.isRequired,
  start: PropTypes.bool,
}

const useStyles = makeStyles({
  controls: {
    padding: '2em 0 1em',
  },
})

const SolControls = ({ sol, setSol, maxSol }) => {
  const classes = useStyles()
  const nextSol = () => (sol && sol < maxSol ? sol + 1 : null)

  const previousSol = () => {
    if (sol && sol > 0) return sol - 1
    if (sol === null) return maxSol - 1
    return null
  }

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.controls}
    >
      <Grid item xs={4} style={{ textAlign: 'left' }}>
        <ControlButton sol={nextSol()} setSol={setSol} start />
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'center' }}>
        <Typography component="h2" variant="h3">
          {`Sol ${sol}`}
        </Typography>
      </Grid>
      <Grid item xs={4} style={{ textAlign: 'right' }}>
        <ControlButton sol={previousSol()} setSol={setSol} />
      </Grid>
    </Grid>
  )
}

SolControls.propTypes = {
  sol: PropTypes.number.isRequired,
  setSol: PropTypes.func.isRequired,
  maxSol: PropTypes.number.isRequired,
}

export default SolControls
