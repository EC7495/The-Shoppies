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
      color: '#3f51b5',
    },
  },

  auth: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    color: 'white',
    background: 'black',
    '&:hover': {
      background: '#333333',
      boxShadow:
        '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
    },
  },
}))
