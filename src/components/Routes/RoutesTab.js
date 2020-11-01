import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { connect } from 'react-redux';
import { declOfNum } from '../../utils/helper';
import {setCurrentPathByIndex} from '../../actions/stationActions';

import RouteFull from '../RouteFull';
import RouteShort from '../RouteShort';

const initialLayout = {width: Dimensions.get('window').width};
const fields = ['first', 'second', 'third'];

const RoutesTab = ({currentPaths, isBig}) => {
  const [index, setIndex] = React.useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentPathByIndex(index));
  }, [index, dispatch]);

  const routes = currentPaths.map((path, idx) => {
    const time = Math.round(path.time / 60);
    return {
    key: fields[idx],
    title: `${time} ${declOfNum(time, ['минута', 'минуты', 'минут'])}`,
    subtitle: !path.changesCount ? 'Без пересадок' : `${path.changesCount} ${declOfNum(path.changesCount, ['пересадка', 'пересадки', 'пересадок'])}`,
  }});

  const FirstRoute = () => (
    <View style={styles.scene}>
      {isBig ? (
        <RouteFull data={currentPaths[0]} />
      ) : (
        <RouteShort data={currentPaths[0]} />
      )}
    </View>
  );

  const SecondRoute = () => {
    return (
      <View style={styles.scene}>
        {isBig ? (
          <RouteFull data={currentPaths[1]} />
        ) : (
          <RouteShort data={currentPaths[1]} />
        )}
      </View>
    );
  };

  const ThierdRoute = () => {
    return (
      <View style={styles.scene}>
        {isBig ? (
          <RouteFull data={currentPaths[2]} />
        ) : (
          <RouteShort data={currentPaths[2]} />
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThierdRoute,
  });

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{height: isBig ? '100%' : 130}}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        swipeEnabled
        renderTabBar={(props) => (
          <TabBar
            {...props}
            // eslint-disable-next-line react-native/no-inline-styles
            indicatorStyle={{backgroundColor: '#E65353'}}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{backgroundColor: '#fff', elevation: 0}}
            renderLabel={({route, focused}) => (
              <>
                <Text style={focused ? styles.tabTextFocused : styles.tabText}>
                  {route.title}
                </Text>
                <Text style={focused ? styles.tabTextFocused : styles.tabText}>
                  {route.subtitle}
                </Text>
              </>
            )}
          />
        )}
      />
    </View>
  );
};

const mapStateToProps = ({stations}) => ({
  currentMode: stations.mode,
  currentPaths: stations.paths,
});

export default connect(mapStateToProps)(RoutesTab);

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    marginTop: 20,
    marginLeft: 10,
    backgroundColor: '#fff',
  },
  tabText: {
    color: '#5A5A5A',
    textAlign: 'left',
    fontWeight: '500',
  },
  tabTextFocused: {
    color: '#000',
  },
});
