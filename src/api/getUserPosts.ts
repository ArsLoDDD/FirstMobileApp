import axios from 'axios';
import IPost from '../types/post';

const getUserPosts = async (id: number): Promise<IPost[] | void> => {
  try {
    const {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}/posts`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserPosts;
