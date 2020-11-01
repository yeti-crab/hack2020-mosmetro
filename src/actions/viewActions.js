import {setPaths, setFromStation, setToStation} from './stationActions';
import findPath from '../utils/findPath';
// мод отвечает за текушие представление
// возможные варианты -
// choosen_station - экран выбора станции (туды, сюды)
// search_station - экран поиска станции
// show_path_mini - маленькии экран просмотра маршрутов
// show_path - подробный экран маршрутов
// station_info - экран при клике на станцию на карте
// src/components/BottomMain/BottomMain.js будет разруливать эти статусы
export const changeViewMode = (mode) => (dispatch, getState) => {
  const {view, stations} = getState();
  const {mode: prevMode} = view;
  // если с экрана маленьких маршрутов возврашаемся на начальный экран,
  // скинем выбранные станции
  if (prevMode === 'show_path_mini' && mode === 'choosen_station') {
    dispatch(setFromStation(null));
    dispatch(setToStation(null));
  }
  dispatch({
    type: 'CHANGE_VIEW_MODE',
    payload: mode,
  });
  if (mode === 'show_path_mini' || mode === 'show_path') {
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
