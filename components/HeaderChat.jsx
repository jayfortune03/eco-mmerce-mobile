import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { checkToken } from '../store';
import Logo from './Logo';

export default function HeaderChat() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => {
          navigation.goBack();
        }}
        underlayColor="#1da365"
        style={styles.hightlight}
      >
        <View style={styles.headerBtn}>
          <Ionicons name="ios-chevron-back" size={24} color="#424242" />
          <Text style={{ marginLeft: 6 }}>Back</Text>
        </View>
      </TouchableHighlight>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Image
          source={{
            uri: 'https://st.depositphotos.com/1597387/1984/i/950/depositphotos_19841901-stock-photo-asian-young-business-man-close.jpg',
          }}
          style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 4 }}
        />
        <Text style={{ fontWeight: 'bold', color: '#444444' }}>User Name</Text>
      </View>
      <View style={{ flex: 1 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 12,
  },
  headerBtn: {
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  hightlight: {
    borderRadius: 12,
    opacity: 0.5,
    flex: 1,
  },
});
