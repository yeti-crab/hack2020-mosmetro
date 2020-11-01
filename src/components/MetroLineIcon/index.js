import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import d1 from './svg/d1';
import d2 from './svg/d2';
import m from './svg/m';

import styles from './styles';

export default MetroLineIcon = ({data}) => {
  const getIcon = (arg) => {
    switch (arg) {
      case 'D1':
      case 'd1':
        return d1;
      case 'D2':
      case 'd2':
        return d2;
      default:
        return m;
    }
  };

  return (
    <View style={styles.wrapper}>
      <SvgXml xml={getIcon(data.name)} />
      <View style={[styles.branchId, {backgroundColor: data.color}]}>
        <Text style={styles.branchIdText}>
          {data.name}
        </Text>
      </View>
    </View>
  );
};
