import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

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

/**
 * email cannot be update
 * name, phone, password, address
 * password rehashed
 * only ADMIN SUPER_ADMIN - role is deleted
 * promoting to SUPER_ADMIN - SUPER_ADMIN
 */

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload
) => {
  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  if (payload.role) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUILD) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (
      decodedToken.role === Role.SUPER_ADMIN &&
      decodedToken.role === Role.ADMIN
    ) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role == +Role.USER || decodedToken.role === Role.GUILD) {
      throw new AppError(httpStatus.FORBIDDEN, "Your are not authorized");
    }
  }

  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      envVars.BCRYPT_SALT_ROUND
    );
  }

  const newUpdateUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdateUser;
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
  updateUser,
};
