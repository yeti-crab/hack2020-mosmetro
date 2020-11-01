import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import RoutesTab from '../Routes/RoutesTab';
import CloseLayoutButton from '../CloseLayoutButton/CloseLayoutButton';
import {changeViewMode} from '../../actions/viewActions';

const BigPathWrapper = () => {
  const dispatch = useDispatch();
  const onClose = useCallback(
    () => dispatch(changeViewMode('show_path_mini')),
    [dispatch],
  );
  return (
    <View>
      <Text style={styles.text}>Маршруты</Text>
      <CloseLayoutButton onPress={onClose} />
      <View style={{marginBottom: 40, paddingBottom: 20}}>
        <RoutesTab isBig />
      </View>
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

export default BigPathWrapper;
