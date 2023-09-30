import axios from 'axios';
import IPost from '../types/post';

const getDataPost = async (id: number): Promise<IPost | void> => {
  try {
    console.log(id);

    const {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getDataPost;
