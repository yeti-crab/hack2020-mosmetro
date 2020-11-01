import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import transfer from './svg/transfer';

import styles from './styles';

export default Transfer = ({data, short}) => {
  const time = Math.round(data.time / 60);

  if (short) {
    return (
      <View style={[styles.wrapper, short ? styles.short : null]}>
        <View style={styles.timeBlock}>
          <SvgXml xml={transfer} />
          {/*<Text style={styles.timeText}>*/}
            {/*{data.time} мин*/}
          {/*</Text>*/}
        </View>
      </View>
    )
  }

  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.transferText}>
          Пересадка
        </Text>
      </View>
      <View style={styles.timeBlock}>
        <SvgXml xml={transfer} />
        <Text style={styles.timeText}>
          {time} мин
        </Text>
      </View>
    </View>
  );
};
