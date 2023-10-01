import React, {useEffect, useState} from 'react';
import IPost from '../types/post';
import getDataPost from '../api/getDataPost';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../type.d';
import BackButton from '../components/BackButton';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import {useTypedSelector} from '../redux/store';
import UserAvatar from '../components/UserInfo/UserAvatar/UserAvatar';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../../type.d';

const PostScreen: React.FC = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const user = useTypedSelector(state => state.user);
  const route = useRoute<RouteProp<RootStackParamList, 'Post'>>();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {postId} = route.params;
  const defOpacity = useSharedValue(0);
  const defPosition = useSharedValue(500);

  const animText = useAnimatedStyle(() => ({
    opacity: defOpacity.value,
  }));
  const anim = useAnimatedStyle(() => ({
    transform: [{translateY: defPosition.value}],
  }));

  useEffect(() => {
    defOpacity.value = withDelay(800, withTiming(1, {duration: 800}));
    defPosition.value = withTiming(0, {
      duration: 800,
    });
  }, [defOpacity, defPosition]);

  useEffect(() => {
    (async () => {
      const postData = await getDataPost(postId);
      setPost(postData || null);
    })();
  }, [postId]);

  return (
    <View>
      <BackButton />
      {post && user ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.authorBox}>
            <Text>{user.name}</Text>
            <UserAvatar size={30} id={user.id} />
          </TouchableOpacity>
          <View style={styles.textBox}>
            <Text numberOfLines={1} style={styles.title}>
              {post.title}
            </Text>
            <Animated.ScrollView style={[styles.textContainer, anim]}>
              <Animated.Text style={[styles.text, animText]}>
                {post.body + post.body}
              </Animated.Text>
            </Animated.ScrollView>
            <Animated.Image
              style={[styles.postImage, animText]}
              source={{uri: `https://random.imagecdn.app/200/150`}}
            />
            <Animated.Image
              style={[styles.postImage, animText]}
              source={{uri: `https://random.imagecdn.app/200/150`}}
            />
          </View>
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  authorBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    width: '80%',
    marginTop: 10,
  },
  textBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  textContainer: {
    width: '100%',
    height: '25%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  postImage: {
    width: '100%',
    height: '24%',
    borderRadius: 8,
    marginTop: 20,
  },
});

export default PostScreen;
