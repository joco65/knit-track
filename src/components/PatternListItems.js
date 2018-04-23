import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import ContentHeader from 'components/ContentHeader';
import ListLinkBlock from 'components/ListLinkBlock';

const styles = theme => ({
  list: {
    padding: 0,
  },
  noPattern: {
    padding: theme.spacing.unit * 2,
  },
});

const PatternListItems = ({ patterns, onPatternClick, classes }) => {

  let patternListContent = (
    <Typography variant="subheading" className={classes.noPattern}>
      No patterns created yet!
    </Typography>
  );

  if (patterns.length) {
    patternListContent = (
      <List className={classes.list}>
        {patterns.map(pattern => (
          <React.Fragment key={pattern.patternId}>
            <ListLinkBlock
              link="/pattern"
              title={pattern.title}
              onClick={() => onPatternClick(pattern.patternId)}
            />
            <Divider />
          </React.Fragment>
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

PatternListItems.propTypes = {
  patterns: PropTypes.arrayOf(
    PropTypes.shape({
      patternId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onPatternClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PatternListItems);