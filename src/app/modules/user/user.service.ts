import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({
    name,
    email,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});

  return users;
};

export const UserServices = {
  createUser,
  getAllUsers,
};
