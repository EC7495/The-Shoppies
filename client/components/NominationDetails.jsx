import React from 'react'
import { Card } from '@material-ui/core'

const NominationDetails = ({ nomination }) => (
  <Card elevation={5} id="nomination-details">
    <span>
      <strong>Title: </strong>
    </span>
    <span>{nomination.Title}</span>
    <br />
    <span>
      <strong>Released: </strong>
    </span>
    <span>{nomination.Year}</span>
    <br />
    <span>
      <strong>Rated: </strong>
    </span>
    <span>{nomination.Rated}</span>
    <br />
    <span>
      <strong>Genre: </strong>
    </span>
    <span>{nomination.Genre}</span>
    <br />
    <span>
      <strong>Directed by: </strong>
    </span>
    <span>{nomination.Director}</span>
    <br />
    <span>
      <strong>Starring: </strong>
    </span>
    <span>{nomination.Actors}</span>
    <br />
  </Card>
)

export default NominationDetails
