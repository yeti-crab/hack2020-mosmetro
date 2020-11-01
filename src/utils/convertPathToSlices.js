import _ from 'lodash';

function glueWithPrevious(nodes, i) {
  let curr = nodes[i];
  let prev = nodes[i - 1];
  if (!curr) {
    curr = {};
    curr.fromNode = prev.toNode
  }
  if (!curr || !curr.fromNode || !prev || !prev.fromNode) return;

  let currLineId = curr.fromNode.split('_')[0];
  let prevLineId = prev.fromNode.split('_')[0];

  let currStationId = curr.fromNode.split('_')[1];
  let prevStationId = prev.fromNode.split('_')[1];

  let isSameLine = currLineId === prevLineId;

  if (isSameLine) {
    let stationIdNumbers = _.map([currStationId, prevStationId], function (stationId) {
      return _.parseInt(stationId.replace('station', ''));
    });
    let sliceId = currLineId + '_' + _.sortBy(stationIdNumbers).join('-');
    return sliceId;
  } else {
    return _.sortBy([curr.fromNode, prev.fromNode]).join('-');
  }
}
 const convertPathToSlices = (path) => {
  const slices = [];
  let nodes = path.edges;
  for (let i = 0; i <= nodes.length; i++) {
    const glued = glueWithPrevious(nodes, i);
    if (glued) {
      slices.push(glued);
    }
  }
  return slices;
}

export default convertPathToSlices;
