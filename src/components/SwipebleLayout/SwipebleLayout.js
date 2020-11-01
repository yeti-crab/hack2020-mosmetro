import React from 'react';
import BottomSheet from 'reanimated-bottom-sheet';
import {View, Text, StyleSheet, Dimensions, Platform} from 'react-native';
import {connect} from 'react-redux';
import {changeViewMode} from '../../actions/viewActions';
import {SvgXml} from 'react-native-svg';
import dragIcon from './svg/dragIcon';

const {height} = Dimensions.get('window');
let SNAP_POINTS = [
  height * 0.75,
  Platform.OS === 'ios' ? 250 : 340,
  Platform.OS === 'ios' ? 100 : 170,
];

// при каком моде какой индекс снап точек должен показаться
const viewModeToSnapPointsIndex = {
  choosen_station: 2,
  search_station: 0,
  show_path_mini: 1,
  show_path: 0,
  station_info: 1,
  station_info_big: 1,
};

const SwipebleLayout = ({children, viewMode, changeMode}) => {
  const sheetRef = React.useRef(null);
  if (sheetRef.current) {
    sheetRef.current.snapTo(viewModeToSnapPointsIndex[viewMode]);
  }

  // переход между статусами при уменьшении окна
  const onCloseEnd = () => {
    switch (viewMode) {
      case 'search_station': {
        changeMode('choosen_station');
        sheetRef.current.snapTo(viewModeToSnapPointsIndex[viewMode]);
        break;
      }
      case 'show_path': {
        changeMode('show_path_mini');
        sheetRef.current.snapTo(viewModeToSnapPointsIndex[viewMode]);
        break;
      }
      default:
        break;
    }
  };

  const onOpenEnd = () => {
    switch (viewMode) {
      case 'show_path_mini': {
        changeMode('show_path');
        sheetRef.current.snapTo(viewModeToSnapPointsIndex[viewMode]);
        break;
      }
      default:
        break;
    }
  };

  const enabledInteraction = () =>
    viewMode !== 'choosen_station' && viewMode !== 'station_info';

  const renderHeader = () => {
    return (
      <>
        <View style={styles.btsHeaderContainer}>
          <View style={styles.btsHeader}>
            <Text />
            <View
              style={[
                styles.swiperElement,
                !enabledInteraction() && styles.hide,
              ]}>
              <SvgXml xml={dragIcon} />
            </View>
          </View>
        </View>
      </>
    );
  };
  if (viewMode === 'station_info') {
    SNAP_POINTS = [
      height * 0.75,
      Platform.OS === 'ios' ? 120 : 200,
      Platform.OS === 'ios' ? 100 : 170,
    ];
  } else if (viewMode === 'station_info_big') {
    SNAP_POINTS = [
      height * 0.75,
      Platform.OS === 'ios' ? 250 : 300,
      Platform.OS === 'ios' ? 100 : 170,
    ];
  } else {
    SNAP_POINTS = [
      height * 0.75,
      Platform.OS === 'ios' ? 250 : 340,
      Platform.OS === 'ios' ? 100 : 170,
    ];
  }
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={SNAP_POINTS}
      initialSnap={viewModeToSnapPointsIndex[viewMode]}
      renderContent={() => children}
      renderHeader={renderHeader}
      enabledHeaderGestureInteraction={enabledInteraction()}
      enabledContentGestureInteraction={
        Platform.OS === 'ios' ? enabledInteraction() : false
      }
      onCloseEnd={onCloseEnd}
      onOpenEnd={onOpenEnd}
      enabledInnerScrolling={true}
    />
  );
};

const styles = StyleSheet.create({
  btsHeaderContainer: {
    overflow: 'hidden',
    paddingTop: 25,
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
    elevation: 50,
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  swiperElement: {
    width: 108,
    height: 12,
    position: 'absolute',
    top: -12,
  },
  hide: {
    display: 'none',
    opacity: 0,
  },
});

const mapStateToProps = ({view}) => ({
  viewMode: view.mode,
});

const mapDispatchToProps = (dispatch) => ({
  changeMode: (mode) => dispatch(changeViewMode(mode)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SwipebleLayout);
