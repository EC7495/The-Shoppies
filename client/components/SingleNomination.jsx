import React from 'react'
import { Card, Typography, Button } from '@material-ui/core'
import { singleNominationStyles, singleMovieStyles } from './styles'

const SingleNomination = ({ nomination }) => {
  const nominationClasses = singleNominationStyles()
  const movieClasses = singleMovieStyles()
  return (
    <div id="single-nomination" className={nominationClasses.singleNomination}>
      <Card elevation={5} className={movieClasses.movieCard}>
        <div id="overlay" className={movieClasses.overlay}>
          <Button
            className={movieClasses.nominate}
            // onClick={() =>
            //   handleOnClick(movie.imdbID, nominations.includes(movie.imdbID))
            // }
          >
            {/* {nominations.includes(movie.imdbID) ? 'Withdraw vote' : 'Nominate'} */}
          </Button>
        </div>
        <Typography id="title" component="h1" className={movieClasses.text}>
          {nomination.Title}
        </Typography>
        <img
          id="image"
          src={nomination.Poster === 'N/A' ? '/default.jpg' : nomination.Poster}
          className={movieClasses.image}
        ></img>
        <Typography id="year" component="span" className={movieClasses.text}>
          {nomination.Year}
        </Typography>
      </Card>
    </div>
  )
}

export default SingleNomination
