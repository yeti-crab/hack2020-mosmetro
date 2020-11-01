const initialState = {
  // choosen_station, search_station, show_path_mini, show_path, station_info
  // подробнее в src/actions/stationActions.js
  mode: 'choosen_station',
  // укажем для поиска чего (отправки назначения) открыт статус search_station
  // from || to
  searchFor: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};
