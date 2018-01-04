import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import ContentHeader from 'components/ContentHeader';
import PatternTitleBlock from 'components/PatternTitleBlock';

const styles = theme => ({
  list: {
    padding: 0,
  },
  noPattern: {
    marginTop: theme.spacing.unit * 2,
  },
});

const PatternList = ({ patterns, onPatternClick, classes }) => {

  let patternListContent = (
    <Typography type="subheading" className={classes.noPattern}>
      No patterns created yet!
    </Typography>
  );

  if (patterns.length) {
    patternListContent = (
      <List className={classes.list}>
        {patterns.map(pattern => (
          <PatternTitleBlock
            key={pattern.patternID}
            {...pattern}
            onClick={() => onPatternClick(pattern.patternID)}
          />
        ))}
      </List>
    );
  }

  return(
    <div>
      <ContentHeader>Pattern List</ContentHeader>
      {patternListContent}
    </div>
  );
};

PatternList.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternID: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternList);
