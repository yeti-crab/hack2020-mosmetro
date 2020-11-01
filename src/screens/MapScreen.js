import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { Use } from 'react-native-svg'
import { WebView } from 'react-native-webview';
import map from '../map/edik';

import styles from './MapScreen.styles';

import ChooseStation from '../components/ChooseStation/ChooseStation';
import BottomMain from '../components/BottomMain/BottomMain';
import { connect, useDispatch } from 'react-redux';
import { changeViewMode, setTempStations } from '../actions/stationActions';
import stationHelper from '../utils/stationHelper';

const getStationIdFromTextId = (textId) => {
  if (textId.includes('station-caption-')) {
    return textId.replace('station-caption-', '');
  }
  return null;
};


let ruun = `
    document.querySelectorAll("text").forEach((item) => {
      item.addEventListener('click', () => {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          textId: item.id,
          textParentId: item.parentElement.id,
          text: item.textContent,
        }));
      })
    })
    true;
  `;


const MapScreen = ({ currentPath }) => {
    const ref = React.useRef(null);
    const [path, setPath] = React.useState(null);
    const dispatch = useDispatch();

    const selectStationFromMap = (station_id) => {
      if(station_id) {
        const stationsData = stationHelper.findSameStationOnOtherLines(station_id);
        dispatch(setTempStations(stationsData));
        if(stationsData.length > 1){ 
          dispatch(changeViewMode('station_info_big'));
          return;
        } 

          dispatch(changeViewMode('station_info'));
      }
      
    }
    React.useEffect(() => {
      setPath(currentPath);
      if(path && ref.current && currentPath) {
        ref.current.injectJavaScript(`
          document.querySelector('g').style.opacity = 0.3;
          Array.from(document.getElementsByTagName('use')).forEach(el => el.remove());
          true;
        `);
        
        for (const item of currentPath.slices) {
          let string = `
            (function() {
              const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
              use.setAttribute('id', 'privet');
              use.setAttribute('href', '#' + String('${item}'));
              document.querySelector('#somebodyoncetoldme').appendChild(use);
            })();
            true;
          `;
          ref.current.injectJavaScript(string);
        }
        // ref.current.injectJavaScript('alert(document.querySelectorAll("#privet").length)')
      } else {
        ref.current.injectJavaScript(`
          document.querySelector('g').style.opacity = 1;
          Array.from(document.getElementsByTagName('use')).forEach(el => el.remove());
          true;
        `);
      }

    }, [currentPath, path, setPath, ref])
    return (
      <SafeAreaView style={styles.wrapper}>
        <WebView
          style={styles.map}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          source={{ html: map }}
          scalesPageToFit={false}
          ref={ref}


          javaScriptEnabled={true}
          injectedJavaScript={ruun}
          onMessage={(event) => {
            const data = JSON.parse(event.nativeEvent.data);
            let stationId = data.textId;

            if (!stationId) {
              stationId = data.textParentId;
            }
            selectStationFromMap(stationId);
          }}
        />
        <BottomMain />
      </SafeAreaView>
    );
  }


const mapStateToProps = ({stations}) => ({
  currentMode: stations.mode,
  currentPath: stations.path,
});

export default connect(mapStateToProps)(MapScreen)
