import AppError from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from "http-status-codes";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { Tour } from "../tour/tour.model";

const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

const createBooking = async (payload: Partial<IBooking>, userId: string) => {
  const transactionId = getTransactionId();
  const user = await User.findById(userId);

  if (!user?.phone || !user.address) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Please Update Your Profile to Book a Tour."
    );
  }

  const tour = await Tour.findById(payload.tour).select("costFrom");

  if (!tour?.costFrom) {
    throw new AppError(httpStatus.BAD_REQUEST, "No Tour Cost Found");
  }

  const amount = Number(tour.costFrom) * Number(payload.guestCount);

  const booking = await Booking.create({
    user: userId,
    status: BOOKING_STATUS.PENDING,
    ...payload,
  });

  //   throw new Error("some fake error"); // this cause booking done but payment incomplete so here we need to implemented transaction rollback

  const payment = await Payment.create({
    booking: booking._id,
    status: PAYMENT_STATUS.UNPAID,
    transactionId: transactionId,
    amount: amount,
  });

  const updatedBooking = await Booking.findOneAndUpdate(
    booking._id,
    { payment: payment._id },
    { new: true, runValidators: true }
  )
    .populate("user", "name email phone address")
    .populate("tour", "title costFrom")
    .populate("payment");

  return updatedBooking;
};

const getAllBookings = async () => {
  return {};
};

const getUserBookings = async () => {
  return {};
};

const getSingleBooking = async () => {
  return {};
};

const updateBookingStatus = async () => {
  return {};
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getUserBookings,
  getSingleBooking,
  updateBookingStatus,
};
