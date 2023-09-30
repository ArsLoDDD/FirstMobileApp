import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import UserAvatar from './UserAvatar/UserAvatar';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../../type.d';

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
      <UserAvatar id={id} />
      <Text>Full Name: {name}</Text>
      <Text>User Email: {email}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default UserInfo;
