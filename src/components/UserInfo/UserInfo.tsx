import React from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import UserAvatar from './UserAvatar/UserAvatar';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../type.d';
import LinearGradient from 'react-native-linear-gradient';

interface IUserInfoProps {
  id: number;
  name: string;
  email: string;
}
type ProfileParams = {
  id: number;
};

const UserInfo: React.FC<IUserInfoProps> = ({id, name, email}) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const goToProfile = () => {
    const params: ProfileParams = {id};
    navigation.navigate('Profile', params);
  };

  return (
    <TouchableOpacity style={styles.userBox} onPress={() => goToProfile()}>
      <LinearGradient
        colors={['hsla(116, 100%, 50%, 1) 10%', 'hsla(289, 43%, 46%, 1) 93%)']}
        start={{x: 0.9, y: 0.9}}
        end={{x: 0, y: 0.3}}
        style={styles.gradient}>
        <UserAvatar id={id} />
        <View style={styles.textBox}>
          <Text style={styles.textName}>Full Name:</Text>
          <Text style={styles.text}> {name}</Text>
        </View>
        <View style={styles.textBox}>
          <Text style={styles.textName}>User Email:</Text>
          <Text style={styles.text}> {email}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userBox: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  gradient: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 8,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  textName: {
    fontWeight: '600',
    fontSize: 12,
  },
  textBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UserInfo;
