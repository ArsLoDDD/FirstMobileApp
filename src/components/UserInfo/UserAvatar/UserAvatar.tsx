import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

interface IUserAvatarProps {
  id: number;
  size?: number;
  marginBot?: number;
}

const UserAvatar: React.FC<IUserAvatarProps> = ({
  id,
  size = 50,
  marginBot = 0,
}) => {
  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: '#ccc',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: marginBot,
    },
    avatar: {
      width: '100%',
      height: '100%',
      borderRadius: size / 2,
    },
  });
  return (
    <View style={styles.container}>
      <Image
        style={styles.avatar}
        source={{uri: `https://robohash.org/${id}`}}
      />
    </View>
  );
};

export default UserAvatar;
