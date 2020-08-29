import React from 'react'
import { Card, Button } from '@material-ui/core'
import { singleNominationStyles } from './styles'
import NominationDetails from './NominationDetails'

const SingleNomination = ({ nomination, handleOnClick }) => {
  const nominationClasses = singleNominationStyles()
  return (
    <div id="single-nomination" className={nominationClasses.singleNomination}>
      <Card elevation={5} className={nominationClasses.movieCard}>
        <img
          id="image"
          src={nomination.Poster === 'N/A' ? '/default.jpg' : nomination.Poster}
          className={nominationClasses.image}
        ></img>
        <Button
          color="primary"
          onClick={() => handleOnClick(nomination.imdbID)}
        >
          Withdraw vote
        </Button>
      </Card>
      <NominationDetails nomination={nomination} />
    </div>
  )
}

export default SingleNomination
