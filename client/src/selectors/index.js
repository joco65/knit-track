import { createSelector } from 'reselect';

// patterns
const getPatternsById = state => state.patterns.byId;
export const getPatternsLoading = state => state.patterns.loading;
export const getPatternsError = state => state.patterns.error;
export const getPatterns = createSelector(
  [getPatternsById],
  patternsById => Object.keys(patternsById).map(key => patternsById[key])
);

// sections
const getSectionsById = state => state.sections.byId;
const getRowIdsFromSection = (state, sectionId) => (
  getSectionsById(state)[sectionId].rowIds
);
export const getCurrentRow = (state, sectionId) => (
  getSectionsById(state)[sectionId].currentRow
);

// rows
const getRowsById = state => state.rows.byId;

// router
const getPath = state => state.router.location.pathname;
export const getSelectedPatternId = createSelector(
  [getPath],
  path => {
    const pathTokens = path.split('/').filter(x => x !== '');
    const idFromPath = (pathTokens[0] === 'patterns') ? pathTokens[1] : null;
    return idFromPath;
  }
);

// cross-slice
export const getSelectedPattern = createSelector(
  [getPatternsById, getSelectedPatternId],
  (patterns, selectedPatternId) => {
    if (!selectedPatternId || !patterns[selectedPatternId]) {
      return null;
    }
    return patterns[selectedPatternId];
  }
);

export const getSelectedPatternSections = createSelector(
  [getSelectedPattern, getSectionsById],
  (selectedPattern, sections) => {

    if (!selectedPattern || !selectedPattern.sectionIds) return [];

    const selectedPatternSections = selectedPattern.sectionIds.map(sectionId => sections[sectionId]);
    return selectedPatternSections.filter(section => section);
  }
);

export const getRowsFromSection = createSelector(
  [getRowIdsFromSection, getRowsById],
  (rowIds, rows) => {
    const rowsFromSection = rowIds.map(rowId => rows[rowId]);
    return rowsFromSection.filter(row => row);
  }
);
