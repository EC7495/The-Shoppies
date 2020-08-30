import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1% 0',
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
