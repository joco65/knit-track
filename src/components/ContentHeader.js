import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    borderBottom: '1px solid #AAA',
    background: theme.palette.primary.light,
  },
  text: {
    flex: 1,
    textAlign: ({ button }) => button ? 'left' : 'center',
  },
});

const ContentHeader = ({ classes, children, button }) => (
  <AppBar
    position="static"
    elevation={0}
    className={classes.root}
    color="secondary"
  >
    <Toolbar>
      <Typography variant="h5" color="inherit" className={classes.text}>
        {children}
      </Typography>
      {button}
    </Toolbar>
  </AppBar>
);

ContentHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  button: PropTypes.element,
};

export default withStyles(styles)(ContentHeader);