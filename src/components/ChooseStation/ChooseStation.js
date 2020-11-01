import React from 'react';
import {connect} from 'react-redux';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  setFromStation,
  setToStation,
  clearChoosenStation,
  swapStations,
} from '../../actions/stationActions';
import {changeViewMode, changeSearchFor} from '../../actions/viewActions';
import {SvgXml} from 'react-native-svg';
import clearIcon from './svg/clearIcon';
import swapIcon from './svg/swapIcon';

const ChooseStation = ({
  fromStation,
  toStation,
  startSearchFor,
  startSearch,
  clearStation,
  onSwapStations,
}) => {
  const stationsChoosened = fromStation && toStation;

  const onPress = (searchFor) => {
    startSearchFor(searchFor);
    startSearch();
  };

  const colorFromStation =
    (fromStation &&
      fromStation.line &&
      fromStation.line.lineLogo.color &&
      fromStation.line.lineLogo.color) ||
    '#c4c4c4';
  const colorToStation =
    (toStation &&
      toStation.line &&
      toStation.line.lineLogo.color &&
      toStation.line.lineLogo.color) ||
    '#c4c4c4';

  return (
    <View style={{position: 'relative'}}>
      <TouchableOpacity onPress={() => onPress('from')}>
        <View style={styles.chooseBtn}>
          <View style={[styles.color, {backgroundColor: colorFromStation}]} />
          <Text
            style={[
              styles.text,
              !(fromStation && fromStation.nameRu) && styles.placeholder,
            ]}>
            {(fromStation && fromStation.nameRu) || 'Откуда?'}
          </Text>
          {fromStation && (
            <TouchableOpacity
              style={styles.clear}
              onPress={() => clearStation('from')}>
              <SvgXml xml={clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress('to')}>
        <View style={[styles.chooseBtn, styles.btnBottom]}>
          <View style={[styles.color, {backgroundColor: colorToStation}]} />
          <Text
            style={[
              styles.text,
              !(toStation && toStation.nameRu) && styles.placeholder,
            ]}>
            {(toStation && toStation.nameRu) || 'Куда?'}
          </Text>
          {toStation && (
            <TouchableOpacity
              style={styles.clear}
              onPress={() => clearStation('to')}>
              <SvgXml xml={clearIcon} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      {stationsChoosened && (
        <TouchableOpacity style={styles.swapIcon} onPress={onSwapStations}>
          <SvgXml xml={swapIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 0,
  },
  chooseBtn: {
    height: 46,
    backgroundColor: '#f4f4f4',
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  color: {
    width: 8,
    height: 8,
    backgroundColor: '#c4c4c4',
    borderRadius: 8 / 2,
    marginRight: 12,
  },
  btnBottom: {
    marginTop: 4,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  btsHeaderContainer: {
    overflow: 'hidden',
    paddingTop: 20,
  },
  btsHeader: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -10,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.0,
    elevation: 8,
  },
  text: {
    fontFamily: 'Roboto',
  },
  placeholder: {
    opacity: 0.5,
  },
  clear: {
    marginLeft: 'auto',
  },
  swapIcon: {
    position: 'absolute',
    right: 80,
    top: 38,
  },
});

const mapStateToProps = ({stations}) => ({
  fromStation: stations.fromStation,
  toStation: stations.toStation,
});

const mapDispatchToProps = (dispatch) => ({
  changeFromStation: (station) => dispatch(setFromStation(station)),
  changeToStation: (station) => dispatch(setToStation(station)),
  startSearchFor: (sFor) => dispatch(changeSearchFor(sFor)),
  startSearch: () => dispatch(changeViewMode('search_station')),
  // direction = 'from' || 'to'
  clearStation: (direction) => dispatch(clearChoosenStation(direction)),
  onSwapStations: () => dispatch(swapStations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChooseStation);
