import React from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import SearchStation from '../SearchStation/SearchStation';
import ChooseStation from '../ChooseStation/ChooseStation';
import SwipebleLayout from '../SwipebleLayout/SwipebleLayout';
import MiniPathWrapper from '../MiniPathWrapper/MiniPathWrapper';
import BigPathWrapper from '../BigPathWrapper/BigPathWrapper';
import StationClick from '../StationClick/StationClick';

const BottomMain = ({currentMode}) => {
  const renderView = () => {
    switch (currentMode) {
      case 'choosen_station':
        return <ChooseStation />;
      case 'search_station':
        return <SearchStation />;
      case 'show_path_mini':
        return <MiniPathWrapper />;
      case 'show_path':
        return <BigPathWrapper />;
      case 'station_info':
      case 'station_info_big':
        return <StationClick />;
      default:
        break;
    }
  };

  return (
    <>
      <SwipebleLayout>
        <View style={styles.container}>{renderView()}</View>
      </SwipebleLayout>
      <View style={styles.hack} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#fff',
    padding: 15,
    paddingTop: 0,
  },
  // на iphone 11 снизу пустое место скроем его белым квадратом
  hack: {
    height: '10%',
    backgroundColor: '#fff',
  },
});

const mapStateToProps = ({stations, view}) => ({
  fromStation: stations.fromStation,
  toStation: stations.toStation,
  currentMode: view.mode,
});

export default connect(mapStateToProps)(BottomMain);
