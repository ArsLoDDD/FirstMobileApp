import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const SkeletonProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <StatusBar />
        <View style={styles.mainBox}>
          <ShimmerPlaceholder
            style={styles.avatarPlaceholder}
            shimmerColors={['#ccc', '#ddd', '#ccc']}
          />
          <View style={styles.userInfoBox}>
            <ShimmerPlaceholder
              style={styles.namePlaceholder}
              shimmerColors={['#ccc', '#ddd', '#ccc']}
            />
            <View style={styles.userTextInfo}>
              {[1, 2, 3, 4].map(index => (
                <ShimmerPlaceholder
                  key={index}
                  style={styles.textPlaceholder}
                  shimmerColors={['#ccc', '#ddd', '#ccc']}
                />
              ))}
            </View>
          </View>
        </View>
        <View>
          {[1, 2, 3, 4].map(index => (
            <View style={styles.userPosts} key={`${index + Math.random()}`}>
              <ShimmerPlaceholder
                style={styles.textPlaceholder}
                shimmerColors={['#ccc', '#ddd', '#ccc']}
              />
            </View>
          ))}
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
  avatarPlaceholder: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  namePlaceholder: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  textPlaceholder: {
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
  userPosts: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 100,
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 35,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default SkeletonProfileScreen;
