import initialStations from '../dataset/stations.json';
import initialTransfers from '../dataset/transfer.json';

const initialState = {
  allStations: initialStations,

  allTransfers: initialTransfers,
  tempStations: [],
  paths: [],
  path: null,
  // выбранная станция отправки
  fromStation: null,
  // выбранная станция назначения
  toStation: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SELECT_FROM_STATION': {
      return {
        ...state,
        fromStation: action.payload,
      };
    }
    case 'SELECT_TO_STATION':
      return {
        ...state,
        toStation: action.payload,
      };
    case 'CHANGE_VIEW_MODE':
      return {
        ...state,
        mode: action.payload,
      };
    case 'SET_SEARCH_FOR':
      return {
        ...state,
        searchFor: action.payload,
      };
    case 'SET_PATHS':
      return {
        ...state,
        paths: action.payload.paths,
      };
    case 'SET_CURRENT_PATH':
      return {
        ...state,
        path: state.paths[action.payload.index],
      };
    case 'SELECT_TEMP_STATIONS':
      return {
        ...state,
        tempStations: action.payload,
      }
    default:
      return state;
  }
};
