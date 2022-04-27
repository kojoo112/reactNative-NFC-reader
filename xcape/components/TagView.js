import {ScrollView, StyleSheet} from 'react-native';
import React from 'react';

const TagView = props => {
  return (
    <ScrollView>
      {props.components.array.forEach(element => {
        <element.component url={element.url} />;
      })}
    </ScrollView>
  );
};

export default TagView;

const styles = StyleSheet.create({});
