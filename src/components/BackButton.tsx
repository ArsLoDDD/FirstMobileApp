import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {HomeScreenNavigationProp} from '../../type.d';

const BackButton: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.btnBox}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <View style={styles.backBtnBox}>
          <Text>Back</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={[styles.backBtnBox]}>
          <Text>Home</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btnBox: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 14,
  },
  backBtnBox: {
    display: 'flex',
    alignItems: 'center',
    width: 80,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default BackButton;
