import React from 'react'
import { Card, Button } from '@material-ui/core'
import { singleNominationStyles } from './styles'
import NominationDetails from './NominationDetails'

const SingleNomination = ({ nomination, handleOnClick }) => {
  const classes = singleNominationStyles()
  return (
    <div id="single-nomination" className={classes.singleNomination}>
      <Card elevation={5} className={classes.movieCard}>
        <img
          id="image"
          src={nomination.Poster === 'N/A' ? '/default.jpg' : nomination.Poster}
          className={classes.image}
        ></img>
        <Button
          color="primary"
          className={classes.button}
          onClick={() => {
            handleOnClick(nomination.imdbID)
          }}
        >
          Withdraw vote
        </Button>
      </Card>
      <NominationDetails nomination={nomination} />
    </div>
  )
}

export default SingleNomination
