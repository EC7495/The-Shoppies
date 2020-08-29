import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  form: {
    height: '45vh',
    width: '65vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  method: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
      color: '#0074d9',
    },
  },

  auth: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))
