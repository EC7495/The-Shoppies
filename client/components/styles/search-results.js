import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  searchResults: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  allMovies: {
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: 'auto auto auto auto',
    gridTemplateRows: 'auto',
    justifyContent: 'space-evenly',
    gap: '2% 2%',
  },
}))
