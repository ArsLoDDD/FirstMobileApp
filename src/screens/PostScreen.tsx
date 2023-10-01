import React, {useEffect, useState} from 'react';
import IPost from '../types/post';
import getDataPost from '../api/getDataPost';
import {StyleSheet, Text, View} from 'react-native';
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

const PostScreen: React.FC = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'Post'>>();
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
      {post ? (
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.title}>{post.title}</Text>
            <Animated.View style={[styles.textContainer, anim]}>
              <Animated.Text style={[styles.text, animText]}>
                {post.body}
              </Animated.Text>
            </Animated.View>
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
    paddingTop: 60,
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
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default PostScreen;
