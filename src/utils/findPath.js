import prepareGraph from "./prepareGraph";
import convertPathToSlices from "./convertPathToSlices";
import convertPathToSheme from "./convertPathToSheme";
import _ from 'lodash';
import ksp from "k-shortest-path";

  /**
   * Ищет путь между станциями
   *
   * @param  {String} from ID станции отправления
   * @param  {String} to   ID станции назначения
   * @return {Object}      Путь в формате библиотеки crow
   */



 const findPath = (from, to) => {
  let graphOptimizedForTime;

  let graphOptimizedForTimeOptions = { connectionTime: 0 };

  graphOptimizedForTime = graphOptimizedForTime || prepareGraph(graphOptimizedForTimeOptions);
  let result = ksp.ksp(graphOptimizedForTime, from, to, 3);
  result = _.map(result, function(path) {
    let usedStations = _.map((path && path.edges) || [], function (node) {
      return node.fromNode;
    });
    usedStations.push(to);
    let changesCount = _.reduce(usedStations, function (sum, nodeId, index) {
      if (index > 0) {
        let prevLineId = usedStations[index - 1].split('_')[0].replace('line', '');
        let currLineId = nodeId.split('_')[0].replace('line', '');

        if (prevLineId !== currLineId) {
          sum++;
        }
      }
      return sum;
    }, 0);
    // Поправка на хак для приоритета по пересадкам
    let duration = path.totalCost - graphOptimizedForTimeOptions.connectionTime * changesCount;
    let scheme = _.extend(convertPathToSheme(path), {
      duration: parseInt(duration / 60)
    });

    if (duration > 0) {
      return {
        raw: path,
        slices: convertPathToSlices(path),
        scheme: scheme,
        stations: usedStations,
        time: duration,
        changesCount: scheme.changesCount
      };
    }
  });

  const a = _.uniq(_.compact(result), function (resultItem) {
    return JSON.stringify(_.pick(resultItem, 'duration', 'changesCount'));
  });
  console.log(a);
  return a;
};

export default findPath;
