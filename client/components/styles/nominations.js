import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  nominations: {
    height: '100vh',
  },

  mappedNominations: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}))
