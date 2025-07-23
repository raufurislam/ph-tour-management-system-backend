// tour.services.ts
import { excludeField } from "../../constants";
import { tourSearchableFields } from "./tour.constant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: ITourType) => {
  const existingTourType = await TourType.findOne({ name: payload.name });

  if (existingTourType) {
    throw new Error("Tour type already exists.");
  }

  return await TourType.create({ name: payload.name });
};

const getAllTourTypes = async () => {
  return await TourType.find();
};

const updateTourType = async (id: string, payload: ITourType) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  const updatedTourType = await TourType.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return updatedTourType;
};

const deleteTourType = async (id: string) => {
  const existingTourType = await TourType.findById(id);
  if (!existingTourType) {
    throw new Error("Tour type not found.");
  }

  return await TourType.findByIdAndDelete(id);
};

const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });
  if (existingTour) {
    throw new Error("A tour with this title already exists.");
  }

  // const baseSlug = payload.title.toLowerCase().split(" ").join("-");
  // let slug = `${baseSlug}`;

  // let counter = 0;
  // while (await Tour.exists({ slug })) {
  //   slug = `${slug}-${counter++}`; // dhaka-division-2
  // }

  // payload.slug = slug;

  const tour = await Tour.create(payload);

  return tour;
};

const getAllTours = async (query: Record<string, string>) => {
  console.log(query);
  const filter = query;
  const searchTerm = query.searchTerm || "";
  const sort = query.sort || "-createdAt";
  const fields = query.fields.split(",").join(" ") || "";

  delete filter["searchTerm"];
  delete filter["sort"];

  for (const field of excludeField) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete filter[field];
  }

  const searchQuery = {
    $or: tourSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  };

  // console.log(searchQuery);

  const tours = await Tour.find(searchQuery)
    .find(filter)
    .sort(sort)
    .select(fields);

  const totalTours = await Tour.countDocuments();
  return {
    data: tours,
    meta: {
      total: totalTours,
    },
  };
};

const updateTour = async (id: string, payload: Partial<ITour>) => {
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }

  // if (payload.title) {
  //   const baseSlug = payload.title.toLowerCase().split(" ").join("-");
  //   let slug = `${baseSlug}`;

  //   let counter = 0;
  //   while (await Tour.exists({ slug })) {
  //     slug = `${slug}-${counter++}`; // dhaka-division-2
  //   }

  //   payload.slug = slug;
  // }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  return updatedTour;
};

const deleteTour = async (id: string) => {
  return await Tour.findByIdAndDelete(id);
};

export const TourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTours,
  updateTour,
  deleteTour,
};
