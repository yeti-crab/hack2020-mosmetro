import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {SvgXml} from 'react-native-svg';
import closeIcon from './svg/close';

const CloseLayoutButton = ({onPress}) => (
  <TouchableOpacity style={styles.closeBtn} onPress={onPress}>
    <View style={styles.closeBtnIcon}>
      <SvgXml xml={closeIcon} />
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  closeBtn: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 15,
    backgroundColor: '#f4f4f4',
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  closeBtnIcon: {
    marginTop: 6,
    marginLeft: 6,
  },
});

export default CloseLayoutButton;
