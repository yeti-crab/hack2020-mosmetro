import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { SvgXml } from 'react-native-svg';

import arrow from './svg/arrow';
import MetroLineIcon from '../MetroLineIcon';
import Transfer from '../Transfer';
import { changeViewMode } from '../../actions/viewActions';

import styles from './styles';

export default (data) => {
  const dispatch = useDispatch();
  let sections = [];

  if (data?.data?.scheme?.sections) {
    sections = [...data.data.scheme.sections];
    sections.splice(-1, 1);
  }

  const sectionsLength = sections.length;

  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={() => dispatch(changeViewMode('show_path'))}>
      {sections &&
        sections.map((section, index) => {
          if (section.modifier === 'afoot') {
            return (
              <>
                <Transfer
                  key={section._station + index}
                  short={true}
                  data={{time: 6}}
                />
                <SvgXml style={styles.arrow} xml={arrow} />
              </>
            );
          }

          return (
            <>
              <MetroLineIcon
                key={section._station + index}
                data={{color: section.color, name: section.lineCode}}
              />

              {sectionsLength - 1 !== index && (
                <SvgXml style={styles.arrow} xml={arrow} />
              )}
            </>
          );
        })}
    </TouchableOpacity>
  );
};
