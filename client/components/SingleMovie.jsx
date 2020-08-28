import React, { useState } from 'react'
import axios from 'axios'
import { Typography, Card, Button, Snackbar } from '@material-ui/core'
import { singleMovieStyles } from './styles'

const SingleMovie = ({ movie, user }) => {
  const classes = singleMovieStyles()
  const [nominations, setNominations] = useState(user.nominations)
  const [nominationError, setNominationError] = useState(false)
  const [nominationSuccess, setNominationSuccess] = useState(false)
  const [nominationRemoved, setNominationRemoved] = useState(false)

  const handleOnClick = async (movieId, remove) => {
    try {
      if (!remove && nominations.length === 5) return setNominationError(true)

      await axios.put(
        `/api/users/nominate-movie${remove ? `/?remove=${true}` : ''}`,
        { movieId }
      )

      if (remove) {
        setNominations(nominations.filter(id => id !== movieId))
        setNominationRemoved(true)
      } else {
        setNominations([...nominations, movieId])
        setNominationSuccess(true)
      }
    } catch (error) {
      setNominationError(true)
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
        open={nominationError || nominations.length >= 5}
        onClose={() => setNominationError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Snackbar
        message={`Success! ${5 - nominations.length}  nominations left.`}
        open={nominationSuccess}
        onClose={() => setNominationSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Snackbar
        message={`Nomination removed! ${
          5 - nominations.length
        }  nominations left.`}
        open={nominationRemoved}
        onClose={() => setNominationRemoved(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
      />
      <Card elevation={5} className={classes.movieCard}>
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
    </div>
  )
}

export default SingleMovie
