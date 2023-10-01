import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import IUser from '../types/user';
import getUserData from '../api/getUserData';
import UserAvatar from '../components/UserInfo/UserAvatar/UserAvatar';
import BackButton from '../components/BackButton';
import SkeletonProfileScreen from '../components/Skeleton/SkeletonProfile';
import UserPosts from '../components/UserPosts';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {useDispatch} from 'react-redux';
import {setUser as setUserSlice} from '../redux/slices/userSlice';
import {RootStackScreenProps} from '../../type.d';

type User = IUser | void;

const duration = 800;
const ProfileScreen: React.FC<RootStackScreenProps<'Profile'>> = ({route}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const dispatch = useDispatch();
  const defPosition = useSharedValue(300);

  const anim = useAnimatedStyle(() => ({
    transform: [{translateY: defPosition.value}],
  }));

  useEffect(() => {
    defPosition.value = withTiming(0, {
      duration,
      easing: Easing.linear,
    });
  }, [defPosition]);

  const {id} = route.params;

  useEffect(() => {
    (async () => {
      const userData: User = await getUserData(id);
      setUser(userData || null);
      if (userData) {
        dispatch(
          setUserSlice({
            id: userData.id,
            name: userData.name,
          }),
        );
      }
    })();
  }, [id, dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar />
        <BackButton />
        <View style={styles.mainBox}>
          {user ? (
            <>
              <UserAvatar id={id} size={200} marginBot={20} />
              <View style={styles.userInfoBox}>
                <Text style={styles.name}>{user.name}</Text>
                <View style={styles.userTextInfo}>
                  <Text style={styles.text}>Email: {user.email}</Text>
                  <Text style={styles.text}>Phone: {user.phone}</Text>
                  <Text style={styles.text}>Website: {user.website}</Text>
                  <Text style={styles.text}>Company: {user.company.name}</Text>
                </View>
              </View>
              <Animated.View style={anim}>
                <UserPosts id={id} />
              </Animated.View>
            </>
          ) : (
            <SkeletonProfileScreen />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
  },
  userTextInfo: {
    display: 'flex',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    gap: 10,
    width: '80%',
    marginBottom: 20,
  },
});

export default ProfileScreen;
