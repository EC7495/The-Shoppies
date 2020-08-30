import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  header: {
    color: 'white',
    height: '10vh',
    background: '#333333',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'sticky',
  },

  headerItem: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#3f51b5',
    },
  },
}))
