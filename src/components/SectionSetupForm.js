import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import ContentHeader from 'components/ContentHeader';

/* keys here should match the props pulled out in RowInfo component */
const rowProps = {
  fullText: {
    display: 'Full Row Instructions',
    width: 300,
  },
  quickText: {
    display: 'Shorthand/Alert',
    width: 150,
  },
  stitches: {
    display: 'Sts',
    width: 40,
  },
};

const styles = theme => {
  const mainStyles = {
    root: {
      padding: theme.spacing.unit * 3,
    },
    textField: {
      marginLeft: theme.spacing.unit * 2,
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.unit,
    },
    button: {
      marginTop: theme.spacing.unit * 2,
    },
  };

  let rowPropStyles = {};
  for (let prop in rowProps) {
    rowPropStyles[prop] = { width: rowProps[prop].width };
  }

  return Object.assign(mainStyles, rowPropStyles);
}

class SectionSetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  componentWillMount() {

    const { history, sectionId } = this.props;

    if (sectionId == null) {
      history.push('/');
    }

    let initialState = {};
    for (let rowInd = 0; rowInd < this.props.numRows; rowInd++) {
      for (let property in rowProps) {
        initialState[property + rowInd] = '';
      }
    }
    this.setState(initialState);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { history, sectionId, addRow, numRows, clearSection } = this.props;

    let rowInfo;
    for (let rowInd = 0; rowInd < numRows; rowInd++) {
      rowInfo = {};
      for (let property in rowProps) {
        rowInfo[property] = (this.state[property + rowInd]);
      }
      addRow(sectionId, rowInfo);
    }

    event.preventDefault();
    history.push('/pattern');
    clearSection();
  }

  handleReset(event) {
    const { history } = this.props;

    event.preventDefault();
    history.push('/pattern');
  }

  createInput(property = '', rowNum = 0) {
    const inputName = property + rowNum;
    const { classes } = this.props;

    return (
      <TextField label=''
        className={[classes.textField, classes[property]].join(' ')}
        name={inputName}
        key={inputName}
        value={this.state[inputName]}
        onChange={this.handleChange}
        placeholder={rowProps[property].display}
      />
    );
  }

  createRowInput(rowNum = 0) {
    const { classes } = this.props;

    return (
      <div className={classes.row} key={rowNum}>
        <Typography variant="subheading" className={classes.rowLabel}>
          Row {rowNum+1}
        </Typography>
        {Object.keys(rowProps).map(property =>
          this.createInput(property, rowNum))}
      </div>
    );
  }

  allRowInputs() {
    let rowInputs = [];
    for (let rowInd = 0; rowInd < this.props.numRows; rowInd++) {
      rowInputs.push(this.createRowInput(rowInd));
    }
    return rowInputs;
  }

  render() {
    const { sectionId, classes } = this.props;
    if (sectionId == null) {
      return (
        <div>No active section!</div>
      );
    } else {
      return (
        <Hidden xsDown>
          <ContentHeader>Section Setup</ContentHeader>
          <form
            onSubmit={this.handleSubmit}
            onReset={this.handleReset}
            className={classes.root}
          >
            {this.allRowInputs()}
            <Button variant="raised" color="primary" className={classes.button} type="submit">
              Create Section
            </Button>
          </form>
        </Hidden>
      );
    }
  }
};

SectionSetupForm.propTypes = {
  history: PropTypes.object.isRequired,
  sectionId: PropTypes.string,
  addRow: PropTypes.func.isRequired,
  numRows: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SectionSetupForm);