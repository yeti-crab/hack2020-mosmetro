import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import MetroLineIcon from '../MetroLineIcon';
import { declOfNum } from '../../utils/helper';

import styles from './styles';


const defaultLineHightShort = 105;
const defaultLineHight = Platform.OS === 'ios' ? 140 : 156;
const addedStationHight = Platform.OS === 'ios' ? 27 : 28;

export default RouteLine = (data) => {
  const [showAllStations, onShowAllStations] = useState(false);

  const toggleList = () => {
    onShowAllStations(!showAllStations);
  };

  const stationsLength = data.data.stations.length;

  return (
    <View style={styles.wrapper}>
      <View style={styles.lineBlock}>
        <View style={[
          styles.line,
          {height: !stationsLength ? defaultLineHightShort : (!showAllStations ? defaultLineHight : defaultLineHight + (addedStationHight * stationsLength))},
          {backgroundColor: data.data.color}
        ]} />
      </View>
      <View>
        <View style={styles.titleBlock}>
          <View style={[styles.titleBefore, {backgroundColor: data.data.color}]} />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.data.stationRu}
            </Text>
          </View>
        </View>
        <View style={styles.branchBlock}>
          <MetroLineIcon data={{ color: data.data.color, name: data.data.lineCode }}/>
          <Text style={styles.text}>
            {data.data.lineNameRu}
          </Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.text} numberOfLines={1}>
            В сторону станции «Подольская»
          </Text>
        </View>
        {!stationsLength ? null : (
          <View style={[
            styles.stationBlock,
            !showAllStations ? styles.stationBlockClose : styles.stationBlockOpen,
          ]}>
            {!showAllStations ? (
              <>
                <View style={[styles.stationBefore, {borderColor: data.data.color}]} />
                <TouchableOpacity onPress={() => toggleList()}>
                  <Text style={styles.stationText}>
                    Показать {stationsLength} {declOfNum(stationsLength, ['станцию', 'станиции', 'станиций'])}
                  </Text>
                </TouchableOpacity>
              </>) : (
              <>
                <TouchableOpacity onPress={() => toggleList()}>
                  <Text style={styles.stationText}>
                    Скрыть станции
                  </Text>
                </TouchableOpacity>
                {data.data.stations.map((station) => {
                  return (
                  <View style={styles.stationBlockOpenStation}>
                    <View style={[styles.stationBefore, {borderColor: data.data.color}]} />
                    <Text style={styles.text} numberOfLines={1}>
                      {station.stationRu}
                    </Text>
                  </View>
                )})}
              </>
            )}
          </View>
        )}
        <View style={[styles.titleBlock, !stationsLength ? styles.titleBlockBottom : null]}>
          <View style={[styles.titleBefore, {backgroundColor: data.data.color}]} />
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.data.to.stationRu}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
