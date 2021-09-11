import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoLg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoSm: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  textLg: {
    textAlign: 'center',
    margin: 'auto',
  },
}));

const Navbar = () => {
  const classes = useStyles({});
  return (
    <AppBar position='fixed'>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h6' className={classes.logoLg}>
          Oguzhan
        </Typography>
        <Typography variant='h6' className={classes.logoSm}>
          Oguz
        </Typography>
        <Typography variant='h6' className={classes.textLg}>
          Finance App Tracker
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
