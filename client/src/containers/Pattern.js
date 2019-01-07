import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePattern, deleteSection, fetchPatternExpandedIfNeeded } from 'actions';
import PatternContent from 'components/PatternContent';
import { getSelectedPattern, getSelectedPatternSections } from 'selectors';

const mapStateToProps = state => ({
  pattern: getSelectedPattern(state),
  sections: getSelectedPatternSections(state),
  loading: (state.patterns.loading || state.sections.loading),
});

const mapDispatchToProps = dispatch => ({
  deletePattern: patternId => {
    dispatch(deletePattern(patternId));
  },
  deleteSection: sectionId => {
    dispatch(deleteSection(sectionId));
  },
  fetchPatternExpandedIfNeeded: patternId => {
    dispatch(fetchPatternExpandedIfNeeded(patternId));
  },
});

class Pattern extends React.Component {

  componentDidMount() {
   this.props.fetchPatternExpandedIfNeeded(this.props.pattern.patternId);
  }

  render() {
    const { fetchPatternExpandedIfNeeded, ...otherProps } = this.props;
    return (
      <PatternContent {...otherProps} />
    );
  }

}

Pattern.propTypes = {
  pattern: PropTypes.shape({
    title: PropTypes.string,
    info: PropTypes.string,
    patternId: PropTypes.string.isRequired,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      sectionId: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  deletePattern: PropTypes.func.isRequired,
  deleteSection: PropTypes.func.isRequired,
  fetchPatternExpandedIfNeeded: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Pattern);
