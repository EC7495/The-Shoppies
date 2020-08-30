import { makeStyles } from '@material-ui/core'

export default makeStyles(theme => ({
  movieCard: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '200px',
    height: '250px',
    margin: '1%',
    padding: '5%',
    transition: 'all .3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    '&:hover #image': {
      opacity: '0.3',
    },

    '&:hover #title': {
      opacity: '0.3',
    },

    '&:hover #year': {
      opacity: '0.3',
    },

    '&:hover #overlay': {
      opacity: '1',
    },
  },

  image: {
    height: '80%',
    width: '80%',
    borderRadius: '5%',
    transition: '.5s ease',
    opacity: '1',
    backfaceVisibility: 'hidden',
    boxShadow:
      '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  },

  text: {
    transition: '.5s ease',
    opacity: '1',
  },

  overlay: {
    height: 'inherit',
    width: 'inherit',
    position: 'absolute',
    transition: '.5s ease',
    opacity: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  nominate: {
    zIndex: '1',
    color: 'black',
  },
}))
