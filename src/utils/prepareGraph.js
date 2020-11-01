import _ from 'lodash';
import store from '../store';

import stationHelper from './stationHelper';
import graphlib from 'graphlib';


export default function prepareGraph (options) {
  let S = new graphlib.Graph({multigraph: true});
  let connections =  stationHelper.getStationsConnections(store.getState().stations.allTransfers);

  _.each(connections, function (connection) {

    let previousNode;
    let time = connection.time || 120;
    let duration = connection.inside ? time : options.connectionTime + time;

    _.each(connection.stations, function (currentNode) {
      if (previousNode) {
        S.setEdge(currentNode.stationId, previousNode.stationId, duration);
        S.setEdge(previousNode.stationId, currentNode.stationId, duration);
      }
      previousNode = currentNode;
    });
  });
  return S;
}
