interface IUserAdress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}
interface IUserCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export default interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAdress;
  phone: string;
  website: string;
  company: IUserCompany;
}
