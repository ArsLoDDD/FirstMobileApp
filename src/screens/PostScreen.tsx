import React, {useEffect, useState} from 'react';
import IPost from '../types/post';
import getDataPost from '../api/getDataPost';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../type.d';
import BackButton from '../components/BackButton';

const PostScreen: React.FC = () => {
  const [post, setPost] = useState<IPost | null>(null);
  const route = useRoute<RouteProp<RootStackParamList, 'Post'>>();
  const {postId} = route.params;

  useEffect(() => {
    (async () => {
      console.log(postId, '1111');
      const post = await getDataPost(postId);
      setPost(post || null);
    })();
  }, [postId]);

  return (
    <View>
      <BackButton />
      {post ? (
        <View style={styles.container}>
          <View style={styles.textBox}>
            <Text style={styles.title}>{post.title}</Text>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{post.body}</Text>
            </View>
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
    height: '70%',
    padding: 12,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
});

export default PostScreen;
