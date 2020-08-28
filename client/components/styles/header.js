import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  header: {
    height: '10vh',
    background: 'lightgray',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'sticky',
  },

  headerItem: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: 'white',
    },
  },
}))
