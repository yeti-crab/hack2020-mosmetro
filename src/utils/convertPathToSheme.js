import _ from 'lodash';
import stationHelper from './stationHelper';
  /**
   * Конвертирует передаваемый объект с результатом поиска маршрута (в формате
   * библиотеки crow) в массив, пригодный для отображения схемы
   *
   * @param {Object} path
   * @returns {Array}
   */

  let stations = {};

    const getLastStation = (id) => {
      let station = stationHelper.getStationById(id);
      return {
        _line: station.line.lineId,
        _station: station.stationId,
        stationRu: station.nameRu,
        stationEn: station.nameEn,
        color: station.line.colorName
      }
    };
   const convertPathToScheme = (path) => {
    const stationsCounters = [];
    let changes;

    let sections = _.chain(path.edges)

      // Создаем базовый массив со всеми станциями
      .map(function (node, i, arr) {
        const fromStation = stationHelper.getStationById(node.fromNode);

        return {
          _line: fromStation.line.lineId,
          _station: fromStation.stationId,
          stationRu: fromStation.nameRu,
          stationEn: fromStation.nameEn,
          color: fromStation.line.lineLogo.color,
          lineNameRu: fromStation.line.nameRu,
          lineNameEn: fromStation.line.nameEn,
          lineCode: fromStation.line.lineLogo.number,
          stations: [],
          weight: node.weight,
        };
      })
      .push(getLastStation(path.edges[path.edges.length-1].toNode))


      // Устанавливаем модификаторы
      .each((node, i, arr) => {
        let next = arr[i + 1];

        if (next) {
          node.modifier = node._line === next._line ? 'train' : 'afoot';
        }
      })

      // Удаляем промежуточные станции
      .map(function (node, i, arr) {
        let prev = arr[i - 1];
        let next = arr[i + 1];

        if (prev && next && prev._line === node._line && next._line === node._line) {
          stationsCounters[stationsCounters.length - 1]++;
          if (!stations[node.lineCode]) {
            stations[node.lineCode] = [];
          }
          stations[node.lineCode].push({
            stationRu: node.stationRu,
            stationEn: node.stationEn,
          });
          node = null;
        } else {
          stationsCounters.push(1);
        }

        return node;
      })

      // Удаляем лишние элементы
      .compact()

      // Вставляем количество станций
      .each(function (node, i, arr) {
        let next = arr[i + 1];

        if (node.modifier !== 'afoot' && i !== arr.length - 1) {
          node.length = stationsCounters[i];
          if (node.lineCode && stations[node.lineCode]) {
            node.stations = stations[node.lineCode];
          }
          delete stations[node.lineCode];
          delete node.weight;

          if (next) {
            node.to = {
              stationRu: next.stationRu,
              stationEn: next.stationEn,
            };
          }
        }
      })

      .value();

    // По-честному считаем количество пересадок
    _.each(sections, function (node, i, arr) {
      let next = arr[i + 1];

      if (isTrain(node) && !isDefined(changes)) {
        changes = 0;
      } else if (!isTrain(node) && isTrain(next) && isDefined(changes)) {
        changes++;
      }
    });

    function isTrain(node) {
      return node && node.modifier === 'train';
    }

    function isDefined(a) {
      return typeof a !== 'undefined';
    }

    return {
      sections: sections,
      changesCount: changes || 0
    };
  };

  export default convertPathToScheme;
