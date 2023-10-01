import React, {useEffect, useState} from 'react';
import getUsers from '../api/getUsers';
import IUser from '../types/user';
import {View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import UserInfo from '../components/UserInfo/UserInfo';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
const duration = 600;
const opacityDuration: number = 1000;

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const defPosition = useSharedValue(600);
  const defOpacity = useSharedValue(0);

  const anim = useAnimatedStyle(() => ({
    transform: [{translateY: defPosition.value}],
    opacity: defOpacity.value,
  }));

  useEffect(() => {
    defPosition.value = withTiming(0, {
      duration,
      easing: Easing.linear,
    });
    defOpacity.value = withTiming(1, {
      duration: opacityDuration,
      easing: Easing.linear,
    });
  }, [defPosition, defOpacity]);

  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setUsers(usersData || []);
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView style={anim}>
        <StatusBar />
        <View style={styles.mainBox}>
          <View style={styles.usersContainer}>
            {users &&
              users.map(user => (
                <UserInfo
                  id={user.id}
                  name={user.name}
                  email={user.email}
                  key={user.id}
                />
              ))}
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  mainBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  usersContainer: {
    display: 'flex',
    gap: 50,
  },
});

export default HomeScreen;
