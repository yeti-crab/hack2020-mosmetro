import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import ChooseStation from '../ChooseStation/ChooseStation';
import RoutesTab from '../Routes/RoutesTab';
import CloseLayoutButton from '../CloseLayoutButton/CloseLayoutButton';
import {changeViewMode} from '../../actions/viewActions';

const MiniPathWrapper = () => {
  const dispatch = useDispatch();
  const onClose = useCallback(
    () => dispatch(changeViewMode('choosen_station')),
    [dispatch],
  );
  return (
    <View>
      <Text style={styles.text}>Маршруты</Text>
      <CloseLayoutButton onPress={onClose} />
      <View>
        <RoutesTab />
      </View>
      <ChooseStation />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: '500',
    lineHeight: 24,
    fontFamily: 'Roboto',
    marginBottom: 10,
  },
});

export default MiniPathWrapper;
