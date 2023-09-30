import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.mrg} onPress={() => navigation.goBack()}>
      <View style={styles.backBtnBox}>
        <Text>Back</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mrg: {
    marginVertical: 10,
    marginLeft: 10,
  },
  backBtnBox: {
    display: 'flex',
    alignItems: 'center',
    width: '15%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default BackButton;
