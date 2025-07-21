import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: IDivision) => {
  const existingDivision = await Division.findOne({ name: payload.name });

  if (existingDivision) {
    throw new Error("A division with this name already exists.");
  }

  const baseSlug = payload.name.toLocaleLowerCase().split(" ").join("-");
  let slug = `${baseSlug}-division`;
  let counter = 0;
  while (await Division.exists({ slug })) {
    slug = `${slug}-${counter++}`; // dhaka-division-2
  }

  payload.slug = slug;

  const division = await Division.create(payload);

  return division;
};

const getAllDivisions = async () => {
  const divisions = await Division.find({});
  const totalDivisions = await Division.countDocuments();
  return {
    data: divisions,
    meta: {
      total: totalDivisions,
    },
  };
};

export const DivisionService = {
  createDivision,
  getAllDivisions,
};
