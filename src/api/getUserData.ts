import axios from 'axios';
import IUser from '../types/user';

const getUserData = async (id: number): Promise<IUser | void> => {
  try {
    const {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserData;
