import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";

const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  // const isPasswordMatch = await bcryptjs.compare(
  //   // password as string,
  //   "753951Bd",
  //   hashedPassword
  // );

  // console.log(isPasswordMatch);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
  // return {};
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUser = await User.countDocuments();

  return {
    meta: {
      total: totalUser,
    },
    data: users,
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
