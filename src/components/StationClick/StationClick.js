import React, {Component, useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';
import {connect} from 'react-redux';
import { changeViewMode, setFromStation, setToStation } from '../../actions/stationActions';
import CloseLayoutButton from '../CloseLayoutButton/CloseLayoutButton';
import MetroLineIcon from '../MetroLineIcon';

const StationClick = ({tempStations, onClose, setFrom, setTo}) => {

  const [index, setIndex] = useState(0);
  const [main, setMain] = useState(null);

  useEffect(() => {
    if(tempStations.length) {
      setMain(tempStations[index]);
    }
  }, [tempStations])


  return (
    <>

      <CloseLayoutButton onPress={() => {onClose()}} />
      { main && (
        <>
      <Text style={styles.headerText}>{main.nameRu}</Text>
        <View style={styles.branchBlock} >
          <MetroLineIcon data={{ color: main.line.lineLogo.color, name: main.line.lineLogo.number }} />
          <Text style={styles.text}>
            {main.line.nameRu}
          </Text>
        </View>
        <View style={styles.buttonsRow}>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => {setFrom(main)}}

              style={[styles.submit, {borderColor: main.line.lineLogo.color}]}
              underlayColor='#fff'>
              <Text style={styles.submitText} >Отсюда</Text>
            </TouchableHighlight>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableHighlight
              onPress={() => {setTo(main)}}
                style={[styles.submit, {borderColor: main.line.lineLogo.color}]}
                underlayColor='#fff'>
                <Text style={styles.submitText} >Сюда</Text>
              </TouchableHighlight>
            </View>
        </View>
        </>
      )}
      {tempStations.length > 1 &&  (
        <>
        <View style={styles.containerWrapper} >
          <Text style={styles.wrapperTitle}>Пересадочные станции</Text>
          <View style={styles.wrapperLine}></View>
        </View>
        {main && tempStations.filter((item) => item.id !== main.id).map((station, idx) => {
          return ( 
            <View key={idx} style={styles.branchBlock} >
              <MetroLineIcon data={{ color: station.line.lineLogo.color, name: station.line.lineLogo.number }} />
              <Text style={styles.text}>
                {station.line.nameRu}
              </Text>
              <Text style={styles.textChoose} onPress={() => {setMain(station)}}>
                Выбрать
              </Text>
            </View>
          )
        })}
        </>
      )}
    </>
  )
}

const mapStateToProps = ({stations}) => ({
  currentMode: stations.mode,
  tempStations: stations.tempStations,
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


export default connect(mapStateToProps,mapDispatchToProps)(StationClick);

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: 'Roboto',
  },
  text: {
    color: "#5A5A5A",
  },
  branchBlock: {
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsRow: {
    paddingTop: 8,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  },
  submit:{
    marginRight:10,
    marginLeft:10,
    marginTop:10,
    marginBottom: 10,
    paddingTop:15,
    paddingBottom:15,
    borderRadius:10,
    borderWidth: 2,
    // flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitText:{
      color:'#000',
      textAlign:'center',
  },
  textChoose: {
    marginLeft: 'auto',
    color: '#2F80ED'
  },
  containerWrapper: { 
    alignItems: "center",
    flexDirection: 'row',
    marginVertical: 5
  },
  wrapperTitle: {
    color: "#5A5A5A",
    marginRight: 10,
    fontSize: 14,
    lineHeight: 24
  },
  wrapperLine: {
    height: 2,
    backgroundColor: "#5A5A5A",
    opacity: 0.5,
    flex: 1,
    position: 'relative',
    top: 2,
  }
});