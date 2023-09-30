import React, {useEffect, useState} from 'react';
import getUsers from '../api/getUsers';
import IUser from '../types/user';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import UserInfo from '../components/UserInfo/UserInfo';

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  useEffect(() => {
    (async () => {
      const usersData = await getUsers();
      setUsers(usersData || []);
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
      </ScrollView>
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
