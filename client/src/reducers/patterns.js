
import {
  updateState,
  updateItem,
  addItem,
  mergeItems,
  deleteFromState,
  deleteItemsFromArray,
} from 'utils/reducerUtils';
import { handleActions } from 'redux-actions';

const initialState = {
  byId: {},
  allIds: [],
  loading: false,
  error: null,
};

const patternsReducer = handleActions({

  REQUEST_DATA: (state, action) => updateState(
    state,
    { loading: true },
    action.payload.dataTypes,
    'patterns',
  ),

  RECEIVE_ERROR: (state, action) => updateState(
    state,
    { loading: false, error: action.payload.error },
    action.payload.dataTypes,
    'patterns',
  ),

  RECEIVE_DATA: (state, action) => mergeItems(
    state,
    action.payload.patterns,
    { loading: false, error: null }
  ),

  RECEIVE_NEW_PATTERN: (state, action) => addItem(
    state,
    {
      ...action.payload.pattern,
      loading: false,
      error: null
    },
    'patternId',
  ),

  RECEIVE_NEW_SECTION: (state, action) => {
    const { patternId, sectionId } = action.payload.section;
    const sectionIds = state.byId[patternId].sectionIds;

    return updateItem(
      state,
      patternId,
      { sectionIds: sectionIds.concat(sectionId) },
      { loading: false, error: null }
    );
  },

  RECEIVE_DELETE_PATTERN_KEYS: (state, action) => deleteFromState(
    state,
    action.payload.patternId
  ),

  RECEIVE_DELETE_SECTION_KEYS: (state, action) => {
    const { patternId, sectionId } = action.payload;
    const sectionIds = state.byId[patternId].sectionIds;

    return updateItem(
      state,
      patternId,
      { sectionIds: deleteItemsFromArray(sectionIds, sectionId) },
    );
  },

}, initialState);


export default patternsReducer;
