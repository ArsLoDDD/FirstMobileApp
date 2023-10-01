import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import getUserPosts from '../api/getUserPosts';
import IPost from '../types/post';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../type.d';

type UserPostsProps = {
  id: number;
};
type PostParams = {
  postId: number;
};

const UserPosts: React.FC<UserPostsProps> = ({id}) => {
  const [posts, setPosts] = useState<IPost[] | null>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  useEffect(() => {
    (async () => {
      const userPosts = await getUserPosts(id);
      setPosts(userPosts || null);
    })();
  }, [id]);

  const goToPost = (postId: number) => {
    const params: PostParams = {postId};
    navigation.navigate('Post', params);
  };

  return (
    <View>
      {posts ? (
        <>
          {posts.map((post: IPost) => (
            <TouchableOpacity
              onPress={() => goToPost(post.id)}
              style={styles.container}
              key={`${post.id}+${post.title}`}>
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.body}>{post.body}</Text>
            </TouchableOpacity>
          ))}
        </>
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
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
  },
  title: {
    marginBottom: 7,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  body: {
    fontSize: 12,
    textAlign: 'left',
  },
});

export default UserPosts;
