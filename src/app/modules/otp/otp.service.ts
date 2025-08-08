import crypto from "crypto";
import { redisClient } from "../../config/redis.config";
import { sendEmail } from "../../utils/sendEmail";

const OTP_EXPIRATION = 2 * 60; // 2min

const generateOTP = (length = 6) => {
  // 6 digit otp
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString();

  return otp;
};

const sendOTP = async (email: string, name: string) => {
  const otp = generateOTP();

  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: OTP_EXPIRATION,
    },
  });

  await sendEmail({
    to: email,
    subject: "Your OTP Code",
    templateName: "otp",
    templateData: {
      name: name,
      otp: otp,
    },
  });
};

const verifyOTP = async () => {
  return {};
};

export const OTPServices = {
  sendOTP,
  verifyOTP,
};
