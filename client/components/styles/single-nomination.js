import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  singleNomination: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5%',
  },

  image: {
    borderRadius: '5%',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  },

  movieCard: {
    padding: '2%',
    margin: '1%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
}))
