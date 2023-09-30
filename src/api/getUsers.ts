import IUser from '../types/user';
import axios from 'axios';

const getUsers = async (): Promise<IUser[] | void> => {
  try {
    const {data} = await axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export default getUsers;
