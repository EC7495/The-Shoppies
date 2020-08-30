import React, { useState } from 'react'
import axios from 'axios'
import { Typography, Card, Button, Snackbar } from '@material-ui/core'
import { singleMovieStyles } from './styles'

const SingleMovie = ({ movie, user }) => {
  const classes = singleMovieStyles()
  const [nominations, setNominations] = useState(user.nominations)
  const [success, setSuccess] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [error, setError] = useState(false)

  const handleOnClick = async (movieId, remove) => {
    try {
      if (!remove && nominations.length === 5) return setError(true)

      const { data: fetchedUser } = await axios.put(
        `/api/users/nominate-movie${remove ? `/?remove=${true}` : ''}`,
        { movieId }
      )

      if (remove) {
        setRemoved(true)
        setError(false)
      } else {
        setSuccess(true)
      }

      setNominations(fetchedUser.nominations)
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div id="singe-movie">
      <Snackbar
        message={
          nominations.length >= 5
            ? 'Max nominations reached! If you want to nominate another movie, remove one of your current nominations first.'
            : 'Oops, there was an error while trying to nominate this movie. Try again!'
        }
        open={error || nominations.length >= 5}
        onClose={() => setError(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Snackbar
        message={`Success! ${5 - nominations.length} nominations left.`}
        open={success}
        onClose={() => setSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Snackbar
        message={`Nomination removed! ${
          5 - nominations.length
        }  nominations left.`}
        open={removed}
        onClose={() => setRemoved(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Card id="movie-card" elevation={5} className={classes.movieCard}>
        <div id="overlay" className={classes.overlay}>
          <Button
            className={classes.nominate}
            onClick={() =>
              handleOnClick(movie.imdbID, nominations.includes(movie.imdbID))
            }
          >
            {nominations.includes(movie.imdbID) ? 'Withdraw vote' : 'Nominate'}
          </Button>
        </div>
        <Typography id="title" component="h2" className={classes.text}>
          {`${movie.Title.substring(0, 41)}${
            movie.Title.length > 41 ? '...' : ''
          }`}
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
    </div>
  )
}

export default SingleMovie
