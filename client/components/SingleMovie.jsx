import React from 'react'
import { Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  singleMovie: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
}))

const SingleMovie = ({ movie }) => {
  const classes = useStyles()
  return (
    <div id="single-movie" className={classes.singleMovie}>
      <Typography gutterBottom variant="h1">
        {movie.Title}
      </Typography>
      <Typography gutterBottom variant="caption">
        {movie.Year}
      </Typography>
    </div>
  )
}

export default SingleMovie
