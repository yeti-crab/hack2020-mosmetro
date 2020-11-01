import findPath from '../utils/findPath';

export const setFromStation = (stationData) => (dispatch, getState) => {
  const {stations} = getState();
  const {toStation} = stations;
  dispatch({
    type: 'SELECT_FROM_STATION',
    payload: stationData,
  });
  // если выбраны обе станции переходим на следуюшии экран
  if (stationData && toStation) {
    dispatch(changeViewMode('show_path_mini'));
  } else {
    dispatch(changeViewMode('choosen_station'));
  }
};

export const setTempStations = (stationsData) => (dispatch) => {
  dispatch({
    type: 'SELECT_TEMP_STATIONS',
    payload: stationsData,
  })
}

export const swapStations = () => (dispatch, getState) => {
  const {stations} = getState();
  const {toStation, fromStation} = stations;
  dispatch({
    type: 'SELECT_FROM_STATION',
    payload: toStation,
  });
  dispatch({
    type: 'SELECT_TO_STATION',
    payload: fromStation,
  });
  if (toStation && fromStation) {
    const {stationId: fromStationId} = fromStation;
    const {stationId: toStationId} = toStation;
    dispatch(setPaths(findPath(fromStationId, toStationId)));
  }
};

// direction = "from" || "to"
export const clearChoosenStation = (direction) => (dispatch) => {
  const actionType =
    direction === 'from' ? 'SELECT_FROM_STATION' : 'SELECT_TO_STATION';
  dispatch({
    type: actionType,
    payload: null,
  });
  dispatch(changeViewMode('choosen_station', true));
};

export const setToStation = (stationData) => (dispatch, getState) => {
  const {stations} = getState();
  const {fromStation} = stations;
  dispatch({
    type: 'SELECT_TO_STATION',
    payload: stationData,
  });
  // если выбраны обе станции переходим на следуюшии экран
  if (stationData && fromStation) {
    dispatch(changeViewMode('show_path_mini'));
  } else {
    dispatch(changeViewMode('choosen_station'));
  }
};

export const setPaths = (paths) => (dispatch) => {
  const activePaths = paths.sort((itemA, itemB) => {
    return itemA.time > itemB.time ? 1 : -1;
  });
  dispatch({
    type: 'SET_PATHS',
    payload: {paths: activePaths},
  });
  dispatch({
    type: 'SET_CURRENT_PATH',
    payload: {index: paths.length ? 0 : null},
  });
};

export const setCurrentPathByIndex = (index) => (dispatch) => {
  dispatch({
    type: 'SET_CURRENT_PATH',
    payload: {index: index},
  });
};



// export const setAllStations = (stations) => ({
//   type: 'SET_ALL_STATIONS',
// })

// мод отвечает за текушие представление
// возможные варианты -
// choosen_station - экран выбора станции (туды, сюды)
// search_station - экран поиска станции
// show_path_mini - маленькии экран просмотра маршрутов
// show_path - подробный экран маршрутов
// station_info - экран при клике на станцию на карте
// src/components/BottomMain/BottomMain.js будет разруливать эти статусы
export const changeViewMode = (mode, dontReset = false) => (
  dispatch,
  getState,
) => {
  const {view, stations} = getState();
  const {mode: prevMode} = view;
  dispatch({
    type: 'CHANGE_VIEW_MODE',
    payload: mode,
  });
  // если с экрана маленьких маршрутов возврашаемся на начальный экран,
  // скинем выбранные станции
  if (
    prevMode === 'show_path_mini' &&
    mode === 'choosen_station' &&
    !dontReset
  ) {
    dispatch(setFromStation(null));
    dispatch(setToStation(null));
    dispatch(setPaths([]));
  }
  if (
    (mode === 'show_path_mini' && prevMode !== 'show_path_mini') ||
    (mode === 'show_path' && prevMode !== 'show_path')
  ) {
    const {fromStation, toStation} = stations;
    const {stationId: fromStationId} = fromStation;
    const {stationId: toStationId} = toStation;
    dispatch(setPaths(findPath(fromStationId, toStationId)));
  }
};

// для чего открыт статус choosen_station
// 'from' || 'to'
export const changeSearchFor = (sFor) => ({
  type: 'SET_SEARCH_FOR',
  payload: sFor,
});
