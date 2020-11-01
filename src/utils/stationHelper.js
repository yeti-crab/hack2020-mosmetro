import _ from 'lodash';
import store from '../store';

const getStationsConnections = (connections) => {
  return connections.map((item) => {
    return {
      time: item.time,
      inside: item.inside,
      stations: [
        item.fromStationId,
        item.toStationId,
      ]
    }
  });
};

function getStationById(stationId) {
  const stations = store.getState().stations.allStations;
  return _.find(stations, function (station) {
    return station && station.stationId === stationId;
  });
}


function findSameStationOnOtherLines(stationId) {
  let thisStation = getStationById(stationId);
  let connections = getStationsConnections(store.getState().stations.allTransfers);
  let myConnections = _.filter(connections, function (con) {
    return con.stations.find(function(item){
      return item.stationId === stationId;
    });
  });
  myConnections.map((item) => {
    return item.stations.map((station) => {
      return station.stationId
    })
  });
  let allConnectedStationsIds = _.chain(myConnections).map(function (con) {
    return con.stations;
  }).flatten().uniq().value();

  let allConnectedStations = allConnectedStationsIds.map((item) => {
    return getStationById(item.stationId);
  });
  let sameNameStations = _.filter(allConnectedStations, function (station) {
    return station.nameRu === thisStation.nameRu;
  });
  return _.chain(sameNameStations).flatten().uniq().value()
}

export default {
  getStationById: getStationById,
  findSameStationOnOtherLines: findSameStationOnOtherLines,
  // getLineByStationId: getLineByStationId,
  getStationsConnections: getStationsConnections,
};
