import React from 'react';
import { ScrollView } from 'react-native';

import RouteLine from '../RouteLine';
import Transfer from '../Transfer';

export default (data) => {
  let sections = [];

  if (data?.data?.scheme?.sections) {
    sections = [...data.data.scheme.sections];
    sections.splice(-1,1);
  }

  const sectionsLength = sections.length;
  return (
    <ScrollView>
      {sections && sections.map((section, index) => {
        if (section.modifier === 'afoot') {
          if (sectionsLength - 1 === index) {
            return null;
          }

          return (
            <Transfer key={section._station + index} data={{time: section.weight}} />
          );
        }

        return (
          <>
            <RouteLine key={section._station + index} data={ section }/>
          </>
        );
      })}
    </ScrollView>
  );
};
