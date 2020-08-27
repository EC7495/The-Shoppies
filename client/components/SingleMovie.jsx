import React, { useState } from 'react'
import axios from 'axios'
import { Typography, Card, Button, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  movieCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '200px',
    height: '250px',
    margin: '1%',
    padding: '5%',
    '&:hover #image': {
      opacity: '0.3',
    },

    '&:hover #title': {
      opacity: '0.3',
    },

    '&:hover #year': {
      opacity: '0.3',
    },

    '&:hover #overlay': {
      opacity: '1',
    },
  },

  image: {
    height: '80%',
    width: '80%',
    borderRadius: '5%',
    transition: '.5s ease',
    opacity: '1',
    backfaceVisibility: 'hidden',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  },

  text: {
    fontFamily: 'Optima',
    transition: '.5s ease',
    opacity: '1',
  },

  overlay: {
    height: 'inherit',
    width: 'inherit',
    position: 'absolute',
    transition: '.5s ease',
    opacity: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nominate: {
    zIndex: '1',
    color: 'black',
  },
}))

const SingleMovie = ({ movie, user }) => {
  const classes = useStyles()
  const currentNominations = {}

  for (const movieId of user.nominations) {
    currentNominations[movieId] = true
  }

  const [nominations, setNominations] = useState(currentNominations)

  const nominateMovie = movieId => {
    try {
      await axios.put('/api/users/nominate-movie', { movieId })
      setNominations({...nominations, [movieId]: true})
      alert('nominated successully')
    } catch (error) {
      return
    }
  }

  return (
    <Card elevation={5} className={classes.movieCard}>
      <div
        id="overlay"
        className={classes.overlay}
        style={{ opacity: `${nominations[movie.imdbID] ? 1 : 0}` }}
      >
        <Button
          disabled={nominations[movie.imdbId]}
          className={classes.nominate}
          onClick={() => nominateMovie(movie.imdbID)}
        >
          {nominations[movie.imdbId] ? 'Already nominated!' : 'Nominate'}
        </Button>
      </div>
      <Typography id="title" component="h1" className={classes.text}>
        {movie.Title}
      </Typography>
      <img
        id="image"
        src={movie.Poster === 'N/A' ? '/default.jpg' : movie.Poster}
        className={classes.image}
      ></img>
      <Typography id="year" component="span" className={classes.text}>
        {movie.Year}
      </Typography>
    </Card>
  )
}

export default SingleMovie
