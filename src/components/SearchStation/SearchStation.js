import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {SvgXml} from 'react-native-svg';
import CloseLayoutButton from '../CloseLayoutButton/CloseLayoutButton';
import {setFromStation, setToStation} from '../../actions/stationActions';
import {changeViewMode} from '../../actions/viewActions';

import search from './svg/search';

import stations from '../../dataset/stations.json';

const obj = {
  from: {
    title: 'Откуда?',
  },
  to: {
    title: 'Куда?',
  },
};

class SearchStation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      stationList: stations,
    };
    this.onChangeInputSearchText = this.onChangeInputSearchText.bind(this);
    this.filteredStationList = this.filteredStationList.bind(this);
    this.selectStation = this.selectStation.bind(this);
  }

  onChangeInputSearchText(text) {
    this.setState({searchText: text});
    this.filteredStationList(text);
  }

  filteredStationList(text) {
    const stationsList = stations
      .filter((station) => {
        return station.nameRu
          .toLocaleLowerCase()
          .startsWith(text.toLocaleLowerCase());
      })
      .filter(
        (station) =>
          station?.id !== this.props.fromStation?.id &&
          station?.id !== this.props.toStation?.id,
      );
    this.setState({stationList: stationsList});
  }

  selectStation(station) {
    if (this.props.searchFor === 'from') {
      this.props.setFrom(station);
    } else if (this.props.searchFor === 'to') {
      this.props.setTo(station);
    }
  }

  render() {
    const {onClose, searchFor, fromStation, toStation} = this.props;

    return (
      <>
        <CloseLayoutButton onPress={onClose.bind(this)} />
        <Text style={styles.headerText}>{obj[searchFor]?.title}</Text>
        <View style={styles.inputFieldWrapper}>
          <View style={styles.inputFieldIcon}>
            <SvgXml xml={search} />
          </View>
          <View>
            <TextInput
              style={styles.inputField}
              onChangeText={(text) => this.onChangeInputSearchText(text)}
              value={this.state.searchText}
              placeholder="Поиск станции"
            />
          </View>
        </View>
        <FlatList
          data={this.state.stationList}
          renderItem={({ item }) => {
            return (
              fromStation?.id !== item.id &&
              toStation?.id !== item.id && (
              <TouchableOpacity
                key={item.id}
                style={styles.stationItem}
                onPress={() => this.selectStation(item)}>
                <View
                  style={[
                    styles.stationColor,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      backgroundColor: item?.line?.lineLogo?.color
                        ? item.line.lineLogo.color
                        : '#EA4184',
                    },
                  ]}
                />
                <Text style={styles.stationName}>
                  {item.nameRu}
                </Text>
              </TouchableOpacity>
            ));
          }}
          keyExtractor={item => item.id}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  inputFieldWrapper: {
    backgroundColor: '#f4f4f4',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginBottom: 20,
    overflow: 'hidden',
  },
  inputField: {
    height: 46,
    fontSize: 15,
    fontFamily: 'Roboto',
  },
  inputFieldIcon: {
    marginRight: 6,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  stationList: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  stationItem: {
    height: 54,
    display: 'flex',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stationColor: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 12,
  },
  stationName: {
    fontFamily: 'Roboto',
    fontSize: 16,
    flex: 1,
  },
});

const mapStateToProps = ({view, stations}) => ({
  // 'from' || 'to' || null
  searchFor: view.searchFor,
  fromStation: stations.fromStation,
  toStation: stations.toStation,
});

const mapDispatchToProps = (dispatch) => ({
  setFrom: (station) => {
    dispatch(setFromStation(station));
  },
  setTo: (station) => {
    dispatch(setToStation(station));
  },
  onClose: () => dispatch(changeViewMode('choosen_station')),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchStation);
